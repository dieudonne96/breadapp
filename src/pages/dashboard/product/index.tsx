import { useAtom } from "jotai";
import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../../../components/Layout";
import Search from "../../../components/Search";
import { useProductByBusiness } from "../../../hooks/useProduct";
import { userAtom } from "../../../provider/atom";

const Product: NextPage = () => {

    const [auth] = useAtom(userAtom)

    const { data } = useProductByBusiness(auth?.businessId);
    const { register } = useForm()

    return (
        <Layout>
            <div className="flex flex-row justify-between mb-5">
                <Search register={register}/>
                <Link href={'/dashboard/product/create'} className="btn">Add</Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>product Id</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(({ name, description, id } : any, index : number) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{name}</td>
                                    <td>{`${description}`.substring(0,20) + " ..."}</td>
                                    <td>{id}</td>
                                    <td><Link href={`/dashboard/product/${id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Product;