// ./[id].js
import React from 'react';
import { useRouter } from 'next/navigation';
import dbConnect from '@/utils/dbConnect';
import Link from 'next/link';
import StudyModel from '@/models/StudyModel';
import Head from 'next/head';

const pdfView = ({ study }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed initially until getServerSideProps finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Format the date as "DD - Month Name - YYYY"
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = study.chapterDate
    ? new Date(study.chapterDate).toLocaleDateString('en-GB', options)
    : '';

    const arrayInputDatas = [];
    for (let i = 0; i < study.arrayInput.length; i++) {
      arrayInputDatas.push(study.arrayInput[i]);
      console.log(study.arrayInput[i]);
    }
  return (
    <>
      <Head>
        <title>{study.chapterName}</title>
      </Head>

      <div data-theme="dracula" className='bg-base-100'>
        <div className="grid grid-cols-1 m-10 justify-center px-10">
          <Link href={'/'} className="btn btn-outline">ALL SUBJECT's PDF LINK</Link>
        </div>
        <div key={study._id}>
          <div role="alert" className="alert alert-success w-1/2 mx-auto text-[#333]">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>You completed the class # <b>{study.subjectName} - {study.chapterName}</b> # on: <u>{formattedDate}</u></span>
          </div>
          <br /><hr /><br />

          <details className="collapse bg-accent">
            <summary className="collapse-title text-xl font-medium text-center text-[#333]">Important Page Numbers</summary>
            <div className="collapse-content">
              {arrayInputDatas.map((data, index) => (
                <span key={index} className='text-[#333] font-medium text-lg'>{data}{index !== arrayInputDatas.length - 1 && ' * '}</span>
              ))}
            </div>
          </details>
          <br /><hr /><br />

          <details className="collapse bg-accent">
            <summary className="collapse-title text-xl font-medium text-center text-[#333]">Class Link</summary>
            <div className="collapse-content">
              <Link className='btn bg-[#fff] text-[#333] hover:bg-[#333] hover:text-[#fff] mx-auto' href={`${study.classLink}`}>GO TO THE CLASS</Link>
            </div>
          </details>
          <br /><hr /><br />
          <details className="collapse bg-accent mx-0">
            <summary className="collapse-title text-xl font-medium text-center text-[#333]">Class PDF</summary>
            <div className="collapse-content mx-0 px-0">
              <iframe
                src={`https://drive.google.com/file/d/${study.pDFLink}/preview?rm=embed`}
                className='h-[85vh] w-[100vw] mx-auto'
                allow="autoplay"
                title="Embedded PDF Viewer"
              ></iframe>
            </div>
          </details>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  try {
    const study = await StudyModel.findOne({ pDFLink: params.id });

    if (!study) {
      return {
        notFound: true,
      };
    }

    return {
      props: { study: JSON.parse(JSON.stringify(study)) }, // Convert to plain JSON to prevent serializable error
    };
  } catch (error) {
    console.error('Error fetching study details:', error);
    return {
      notFound: true,
    };
  }
}

export default pdfView;
