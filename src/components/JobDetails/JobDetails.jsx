import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveJobApplication } from "../../utility/localstorage";

const JobDetails = () => {
    const jobs = useLoaderData();
    const {id}= useParams();
    const idInt = parseInt(id);
    const job = jobs.find (job => job.id === idInt);
    console.log(id, jobs);

const handleApplyJob = () => {
    saveJobApplication(idInt);
    toast('You have applied successfully' );
}
    return (
        <div>
            <h2>JOB details of: {job.job_title} </h2>
            <div className="grid gap-4 md:grid-cols-4">
                <div className="border md:col-span-3 mx-10">
                    <h2 className="text-4xl">Details Coming here</h2>
                    <p className="mt-4"><span className="text-lg font-semibold">Job Description:</span>{job.job_description}</p>
                    <p className="mt-4"><span className="text-lg font-semibold">Job Responsibility:</span>{job.job_responsibility}</p>
                    <p className="mt-4"><span className="text-lg font-semibold">Educational Requirement:</span> <br /> {job.educational_requirements} </p>
                    <p className="mt-4"><span className="text-lg font-semibold">Experiences:</span> <br /> {job.experiences}</p>
                </div>
                <div className="border">
                    <h2 className="text-2xl"> Job Details</h2>
                    <p><span>Salary:</span>{job.salary}</p>
                    <p><span>Job Title:</span>{job.job_title}</p>
                    <h2 className="text-2xl">Contact Information</h2>
                    <p><span>Phone:</span>{job.contact_information.phone}</p>
                    <p><span>Email:</span>{job.contact_information.email}</p>
                    <p><span>Address:</span>{job.contact_information.address}</p>
                    <button onClick={handleApplyJob} className="btn btn-primary w-full">Apply Now</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default JobDetails;