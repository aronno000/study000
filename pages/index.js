import { useState, useEffect } from 'react';
import dbConnect from '@/utils/dbConnect';
import StudyModel from '@/models/StudyModel';
import Link from 'next/link';

const Finalwe = ({ studies }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudies, setFilteredStudies] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter studies based on searchQuery
    const filtered = studies.filter(study =>
      study.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.chapterName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudies(filtered);
  }, [searchQuery, studies]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div data-theme="dracula" className='bg-base-100'>
      <div className="grid grid-cols-1 m-10 justify-center px-10">
        <Link href={'/addNewSubject'} className="btn btn-outline">ADD SUBJECT's PDF LINK</Link>
      </div>
      <div className="grid grid-cols-1 m-10 justify-center px-10">
        <input
          type="text"
          placeholder="Search by subject or chapter name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered input-primary w-full max-w-xs mx-auto dark:text-[#fffbd6]"
        />
      </div>
      <br />
      <div className="overflow-x-auto">
        <table className="table table-zebra text-[#fffbd6] dark:text-[#fffbd6]">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Subject Name:</th>
              <th>Chapter Name:</th>
              <th>View Details:</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredStudies.map((study, index) => (
              <tr key={study._id}>
                <th>{index + 1}</th>
                <td>{study.subjectName}</td>
                <td>{study.chapterName}</td>
                <td><Link className='btn btn-outline btn-secondary' href={`./${study.pDFLink}`} passHref>GO</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  try {
    const studies = await StudyModel.find({});

    return {
      props: { studies: JSON.parse(JSON.stringify(studies)) }, // Convert to plain JSON to prevent serializable error
    };
  } catch (error) {
    console.error('Error fetching Study list:', error);
    return {
      notFound: true,
    };
  }
}

export default Finalwe;
