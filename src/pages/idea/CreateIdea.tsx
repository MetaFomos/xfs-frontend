import React, { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { submitIdea } from "../../redux/idea/actions";
import { Navigate, useNavigate } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";
import Select, { components, ControlProps } from 'react-select';
import { Radio } from "@material-tailwind/react";
import { toast } from "react-toastify"

interface ICreateIdeaProps {}

const categories = [
  { id: 0, label: "Development" }, 
  { id: 1, label: "Marketing" }, 
  { id: 2, label: "Improvement" }, 
]

export const CreateIdea: React.FC<ICreateIdeaProps> = () => {
  const navigate = useNavigate();

  const dispatch: Dispatch<any> = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(`<h1><b>Title</b>:&nbsp;</h1><div><br></div><h1><b>What</b>:</h1><p>&nbsp;</p><h3><b>Who</b>:</h3>`);
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [approveData, setApproveData] = useState({
    tempIndex: 0,
    tempMilestoneName: '',
    tempMilestone: 0,
    tempDate: '',
    milestone: [{ }],
    budget: '',
})

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e: any) => {
    setContent(e.target.value);
  };
  const onChange = (e: any) => {
    setApproveData({ ...approveData, [e.target.name]: e.target.value })
  }
  const milestoneAdd = () => {
    if (approveData.budget == '') {
      toast.warning("Please input budget"); 
      return;
    }
    if (approveData.tempMilestoneName == '') {
      toast.warning("Please input the milestone name"); 
      return;
    }
    if (approveData.tempMilestone == 0) {
      toast.warning("Please input the milestone amount"); 
      return;
    }
    if (approveData.tempDate == '') {
      toast.warning("Please input the milestone date"); 
      return;
    }
    setApproveData({ ...approveData, tempDate: '', tempMilestoneName: '', tempMilestone: 0, tempIndex: approveData.tempIndex+1, milestone: [...approveData.milestone, {index: approveData.tempIndex, title: approveData.tempMilestoneName, date: approveData.tempDate, amount: approveData.tempMilestone}] })
  }
  const milestoneRemove = () => {
      setApproveData({ ...approveData, tempDate: '', tempMilestoneName: '', tempMilestone: 0, tempIndex: approveData.tempIndex-1, milestone: approveData.milestone.filter((item: any) => item.index !== approveData.tempIndex-1) })
  }
  const onSubmit = async () => {
    if (title == "") {
      toast.warning("Please input the title")
      return;
    }
    if (approveData.budget == "") {
      toast.warning("Please input the budget")
      return;
    }
    if (approveData.milestone.length == 1) {
      toast.warning("Please create the milestones"); 
      return;
    }
    setLoading(true);
    var data: any = approveData;
    data.milestone.splice(0, 1);
    const result: any = await dispatch(submitIdea({ title, content, category, data }));
    setLoading(false);
    if (result) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="hero">
      <div className="hero-content w-[100%]">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered"
                name="title"
                value={title}
                onChange={onTitleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <DefaultEditor
                style={{ height: "200px", overflow: "auto" }}
                value={content}
                onChange={onContentChange}
              />
            </div>
            <div className="flex justify-around">
              { categories && categories.map((item, index) => (
                <Radio name="type" key={index} label={item.label} className="w-[100%]" checked={category == item.id} 
                  onChange={(e) => {
                    setCategory(item.id);
                  }}
                />
              )) }
            </div>
            <div className='flex items-center pb-2'>
                <label className="label w-3/12">
                    <span className="label-text font-bold">Budget:</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Budget" 
                    className="input input-bordered w-9/12" 
                    name="budget" 
                    value={approveData.budget} 
                    onChange={onChange}
                />
            </div>
            <div className='flex items-center pb-2'>
                <label className="label w-3/12">
                    <span className="label-text font-bold">Milestone:</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Milestone name" 
                    className="input input-bordered w-9/12" 
                    name="tempMilestoneName" 
                    value={approveData.tempMilestoneName} 
                    onChange={onChange}
                />
            </div>
            <div className='flex items-center pb-2'>
                <label className="label w-3/12"></label>
                <div className='w-9/12'>
                    <input 
                        type="number" 
                        placeholder="Milestone" 
                        className="input input-bordered w-4/12 mr-3" 
                        name="tempMilestone" 
                        value={approveData.tempMilestone} 
                        onChange={onChange}
                    />
                    <input 
                        type="date" 
                        placeholder="Date" 
                        className="input input-bordered w-7/12" 
                        name="tempDate" 
                        value={approveData.tempDate} 
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className='flex items-center pb-2'>
                <label className="label w-3/12"></label>
                <div className='w-9/12'>
                    <button className='btn btn-xs mr-1' onClick={() => milestoneAdd()}>Add</button>
                    <button className='btn btn-xs' onClick={() => milestoneRemove()}>Remove</button>
                </div>
            </div>
            <div className='flex items-center pb-2'>
                <label className="label w-3/12"></label>
                <div className='w-9/12'>
                    {approveData.milestone.map((item: any, index: number) => {
                      if (item.title) {
                        return (
                          <div key={index}>
                              <label className='font-bold flex'>Milestone {item.index+1}:</label> 
                              <p><label className='font-medium'>title: </label><label className='mr-3'>{item.title}</label></p>
                              <label className='font-medium'>date: </label><label className='mr-3'>{item.date}</label>
                              <label className='font-medium'>amount: </label> <label>{item.amount}</label>
                          </div>
                        )
                      }
                    })}
                </div>
            </div>
            {/* <div className="">
              <select className="form-control">
                { categories && categories.map(item => (
                  <option key={item.id}>{item.label}</option>
                )) }
              </select>
            </div> */}
            <div className="form-control mt-6">
              <button
                className={`btn btn-primary text-lg ${loading ? "loading" : ""}`}
                onClick={() => onSubmit()}
              >
                <img src="/icons/paper-aeroplane.png" width={25} className="mr-2" />
                Submit Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
