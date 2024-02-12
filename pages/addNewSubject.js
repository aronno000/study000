// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {Exo_2} from 'next/font/google';

const exoTwo = Exo_2({
  weight: "400",
  subsets: ["latin"],
})


export default function Home() {


  const [formData, setFormData] = useState({
    subjectName: '',
    chapterName: '',
    pDFLink: '',
    chapterDate: '',
    classLink: '',
    arrayInput: [],
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // For arrayInput, split the comma-separated string into an array
    const arrayInput = name === 'arrayInput' ? value.split(',').map(item => item.trim()) : value;
  
    setFormData(prevState => ({
      ...prevState,
      [name]: arrayInput,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form Data:', formData);
  
      const response = await fetch('/api/subjectAPi/addSubjectAPI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('All things are created successfully!');
  
        // Redirect to the dynamic route with the accessToProtectedPage data
        router.push(`/`);
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to create New Product');
      }
    } catch (error) {
      console.error('Error creating Product:', error);
    }
  };
  
  
  


  return (
    <div data-theme="dracula" className={`exoTwo ${exoTwo.className} bg-base-100 `}>
    <div className="grid grid-cols-1 m-10 justify-center px-10">
      <Link href={'/'} className="btn btn-outline">ALL SUBJECT's PDF LINK</Link>
    </div>

<div className="hero min-h-screen mt-0 pt-0 bg-base-100">
  <div className="hero-content flex-col mt-0 pt-0">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold dark:text-[#fffbd6] text-[#fffbd6]">ADD New Chapter's PDF Link</h1>
    </div>
    <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-300 text-secondary">
      <form className="card-body text-secondary">
        <div className="form-control text-secondary">
          <label className="label">
            <span className="label-text text-accent font-bold text-lg">Subject Name</span>
          </label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="input input-bordered"
            required
            spellCheck='false'
          />
        </div>

{/* chapterName */}
<div className="form-control">
  <label className="label">
    <span className="label-text text-accent font-bold text-lg">Chapter Name</span>
  </label>
  <input
    id="chapterName"
    name="chapterName"
    value={formData.chapterName}
    onChange={handleChange}
    className="input input-bordered"
    required
    spellCheck='false'
  ></input>
</div>

    {/* pDFLink */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-accent font-bold text-lg">PDF Link ID:</span>
          </label>
          <input
            type="text"
            id="pDFLink"
            name="pDFLink"
            value={formData.pDFLink}
            onChange={handleChange}
            className="input input-bordered"
            required
            spellCheck='false'
          />
        </div>
{/* Date */}
<div className="form-control">
  <label className="label">
    <span className="label-text text-accent font-bold text-lg">Class Date</span>
  </label>
  <input
    id="chapterDate"
    name="chapterDate"
    type="date"
    value={formData.chapterDate}
    onChange={handleChange}
    className="input input-bordered"
    required
  />
</div>

{/* classLink */}
<div className="form-control">
  <label className="label">
    <span className="label-text text-accent font-bold text-lg">Class Link</span>
  </label>
  <input
    id="classLink"
    name="classLink"
    type='text'
    value={formData.classLink}
    onChange={handleChange}
    className="input input-bordered"
    required
    spellCheck='false'
  ></input>
</div>

<div className="form-control">
  <label className="label">
    <span className="label-text text-accent font-bold text-lg">Number of Pages</span>
  </label>
  <input
  type="text"
  id="arrayInput"
  name="arrayInput"
  value={formData.arrayInput.join(',')} // Convert array to comma-separated string for display
  onChange={handleChange}
  className="input input-bordered"
  required
  spellCheck='false'
/>
</div>




        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleSubmit}>
            ADD THIS...
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

</div>

  );
}
