import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Search from "../components/Search";
import { QrReader } from 'react-qr-reader';
import { useState } from "react";
import {BiScan, BiSearch } from 'react-icons/bi'
import { useForm } from "react-hook-form";
import { useProduct, useProductBlockchain } from "../hooks/useProduct";
const Home: NextPage = () => {

 const [scan, setScan]= useState(false)
 const { handleSubmit, register }  = useForm()
 const [productId, setProductId] = useState<string | null>(null)

 const {data, isValidating} = useProduct(productId)
 const {data: blockchain, isValidating:loading} = useProductBlockchain(productId)

 const onSubmit = ({ search }: any) => {
    setProductId(search)
 }

  return (
    <>
      <Head>
        <title>Web 3.0</title>
        <meta name="description" content="Web 3.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
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
                  console.log("result : ", result)
                  if(result) {
                      setProductId(result.getText())
                      setScan(false)
                  }
                }} 
              constraints={{facingMode : 'user'}} />
          )
        }
      
        <div className="flex flex-row mt-5">
          {
            data && (
              <div className="card w-96 bg-base-100 shadow-xl border border-white">
                  <div className="card-body">
                      <h2 className="card-title">{data.name}</h2>
                      <div className="divider m-0"></div> 
                      <p>{data.description}</p>
                  </div>
              </div>
            )
          }
            <div className="mx-4">
              {
                loading && productId && (<progress className="progress w-56"></progress>)
              }
              {
                blockchain && (
                  <div className="card w-96 bg-base-100 shadow-xl border border-white">
                      <div className="card-body">
                          <h2 className="card-title">Blockchain Data</h2>
                          <div className="divider m-0"></div>
                          {
                            blockchain.items.map(({ tilte, value }: any, index : number) => (
                              <p className="text-sm" key={index}>{tilte}: <span className="font-bold">{value}</span></p>
                            ))
                          }
                          <div className="divider m-0"></div>
                        <div className="card-actions justify-between items-center">
                          <span className="text-base-500 text-xs">{blockchain.timestamp}</span> 
                          <a className="btn btn-sm" href={`https://goerli.etherscan.io/address/${blockchain.sender}`} target="_blank" rel="noreferrer">View</a>
                        </div>
                      </div>
                  </div> 
                )
              }
            </div>
        </div>
       
      </main>
    </>
  );
};

export default Home;

