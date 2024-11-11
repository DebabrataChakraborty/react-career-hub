import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utility/localstorage";
import { ImLocation2 } from "react-icons/im";
import { AiOutlineDollarCircle } from "react-icons/ai";

const AppliedJobs = () => {

    const jobs = useLoaderData();

    const [appliedJobs, setAppliedJobs] = useState([]);

    const [displayJobs, setDisplayJobs] = useState([]);

    const handleJobsFilter = filter => {
        if(filter === 'all'){
            setDisplayJobs(appliedJobs);
        }
        else if(filter === 'remote'){
            const remoteJobs =appliedJobs.filter(job => job.remote_or_onsite ==='Remote');
            setDisplayJobs(remoteJobs);
        }
        else if(filter === 'onsite'){
            const onsiteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Onsite');
            setDisplayJobs(onsiteJobs);
        }
    }

    useEffect(() => {
        const storedJobIds = getStoredJobApplication();
        if (jobs.length > 0) {

            const jobsApplied = [];
            for (const id of storedJobIds) {
                const job = jobs.find(job => job.id === id);
                if (job) {
                    jobsApplied.push(job)
                }
            }

            // const jobsApplied = jobs.filter(job => storedJobIds.includes(job.id))
            console.log(jobsApplied)

            setAppliedJobs(jobsApplied);
            setDisplayJobs(jobsApplied);

        }
    }, [jobs])

    return (
        <div>

            <details className="dropdown">
                <summary className="btn m-1 bg-lime-400">Filter</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li onClick={() => handleJobsFilter('all')}><a>All</a></li>
                    <li onClick={() => handleJobsFilter('remote')}><a>Remote</a></li>
                    <li onClick={() => handleJobsFilter('onsite')}><a>onsite</a></li>
                </ul>
            </details>

            {
            displayJobs.map((job) => (
                <div key={job.id} className="card card-side bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src={job.logo}
                            alt={job.job_title}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{job.job_title}</h2>
                        <p>{job.company_name}</p>
                        <div>
                            <button className="px-5 py-2 font-extrabold border rounded border-[#7E90FE] mr-4 text-[#7E90FE]">{job.remote_or_onsite}</button>
                            <button className="px-5 py-2 font-extrabold border rounded border-[#7E90FE] mr-4 text-[#7E90FE]">{job.job_type}</button>
                        </div>
                        <div className="mt-4 flex">
                            <h2 className="flex mr-4"><ImLocation2 className="text-2xl mr-2"></ImLocation2>{job.location}</h2>
                            <h2 className="flex"><AiOutlineDollarCircle className="text-2xl mr-2"></AiOutlineDollarCircle>{job.salary}</h2>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppliedJobs;