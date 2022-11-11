import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Search from "../components/Search";
import { QrReader } from 'react-qr-reader';
import { useState } from "react";
import {BiScan, BiSearch } from 'react-icons/bi'
import { useForm } from "react-hook-form";
const Home: NextPage = () => {

 const [scan, setScan]= useState(false)
 const { handleSubmit, register }  = useForm()

 const onSubmit = (data: any) => {

 }

  return (
    <>
      <Head>
        <title>Web 3.0</title>
        <meta name="description" content="Web 3.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center justify-center">
          <Search register={register} />
          <button type="submit" className={"btn btn-square ml-4 "}>
              <BiSearch size={24} />
          </button>
          <button className={"btn btn-square ml-4 " + `${scan && 'btn-error'}`} onClick={() => setScan(!scan)}>
              <BiScan size={24} />
          </button>
        </form>
        {
          scan && (
            <QrReader
              containerStyle={{ width: '60%' }}
              onResult={(result, error) => {

                }} 
              constraints={{facingMode : 'user'}} />
          )
        }
      </main>
    </>
  );
};

export default Home;

