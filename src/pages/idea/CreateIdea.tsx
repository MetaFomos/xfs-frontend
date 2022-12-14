import React, { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { submitIdea } from "../../redux/idea/actions";
import { Navigate, useNavigate } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";

interface ICreateIdeaProps {}

export const CreateIdea: React.FC<ICreateIdeaProps> = () => {
  const navigate = useNavigate();

  const dispatch: Dispatch<any> = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(`<h1><b>Title</b>:&nbsp;</h1><div><br></div><h1><b>What</b>:</h1><p>&nbsp;</p><h3><b>Who</b>:</h3>`);
  const [loading, setLoading] = useState(false);
  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e: any) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };
  const onSubmit = async () => {
    setLoading(true);
    const result: any = await dispatch(submitIdea({ title, content }));
    console.log(result);
    setLoading(false);
    if (result) {
      console.log("here");
      navigate("/dashboard");
    }
  };
  return (
    <div className="hero">
      <div className="hero-content xl:w-2/5 md:w-3/5 sm:w-full">
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
            <div className="form-control mt-6">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                onClick={() => onSubmit()}
              >
                Submit Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
