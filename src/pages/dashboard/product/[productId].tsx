import { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "../../../components/Layout"
import { useProduct } from "../../../hooks/useProduct"
import QRCode from 'qrcode.react';
import { useRef } from "react";

const ProductDetail: NextPage = () => {

    const router = useRouter()
    const { productId } = router.query

    const { data, isValidating } = useProduct(productId as string)

    const qrRef = useRef<any>(null)

      // download QR code
  const downloadQRCode = () => {
    if(qrRef.current) {
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = `qr-code.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
  }

    return(
       <Layout>
        <div>
            {
               isValidating && (<progress className="progress w-56"></progress>)
            }   
        </div>
        {
            data && (
            <div className="flex flex-row">
                <div className="card w-96 bg-base-100 shadow-xl border border-white">
                    <div className="card-body">
                        <span>{data.id}</span>
                        <h2 className="card-title">{data.name}</h2>
                        <div className="divider m-0"></div> 
                        <p>{data.description}</p>
                        <div className="card-actions justify-end mt-3">
                            <button className="btn btn-primary">View detail</button>
                        </div>
                    </div>
                </div>
                <div className="mx-4" ref={qrRef}>
                    <QRCode renderAs="canvas" 
                        size={300}
                        className="shadow-lg p-4 border border-white rounded-lg" 
                        value={data.id} />
                    <button className="btn btn-primary mt-3" onClick={downloadQRCode}>Download QR Code</button>
                </div>
            </div>
            )
        }
       </Layout>
    )
}
export default ProductDetail