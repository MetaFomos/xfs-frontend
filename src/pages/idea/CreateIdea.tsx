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

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e: any) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };
  const onSubmit = async () => {
    if (title == "" || content == "") {
      toast.error("Title or Content is empty!!!")
      return;
    }
    setLoading(true);
    
    const result: any = await dispatch(submitIdea({ title, content, category }));
    console.log(result);
    setLoading(false);
    if (result) {
      console.log("here");
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
              { categories && categories.map(item => (
                <Radio id="html" name="type" label={item.label} className="w-[100%]" />
              )) }
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
