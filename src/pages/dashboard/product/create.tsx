import { NextPage } from "next";
import Layout from "../../../components/Layout";
import { TfiArrowLeft } from 'react-icons/tfi'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { createProduct } from "../../../hooks/useProduct";
import { userAtom } from "../../../provider/atom";
import { useAtom } from "jotai";

const Create: NextPage = () => {

    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [auth] = useAtom(userAtom)


    const onSubmit = ({ name, description }:any) => {
        setLoading(true)
        createProduct({ name, description, businessId : auth?.businessId })
        .then(() => {
            setLoading(false)
            router.back()
        }).catch((err) => {
            setLoading(false)
            alert("Error occured... : " + err.message)
        })
    }

    const onBack = () => {
        router.back()
    }

    return(
        <Layout>
            <div className="bg-neutral w-full h-10 rounded-lg items-center">
                <button onClick={onBack} className="btn btn-square">
                    <TfiArrowLeft size={22} className="text-white" />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 bg-gray-100 w-3/5 p-8 rounded-2xl">
                <input placeholder="Name" className="placeholder:text-xs input input-bordered input-sm w-full" {...register("name",{ required : true })} />
                <textarea placeholder="Description" className="placeholder:text-xs mt-4 textarea textarea-bordered w-full" {...register("description", { required : true })} />
                <button className={"btn " + `${ loading && 'loading'}`} type="submit">Create</button>
            </form>
        </Layout>
    )
}

export default Create;