import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddPostForm.css";

const initialFormData = {
  title: "",
  description: "",
  body: "",
  titleError: "",
  descriptionError: "",
  bodyError: "",
};

/** Form for adding a new post */
function AddPostForm({ addBlogPost }) {
  const [formData, setFormData] = useState(initialFormData);

  const history = useHistory();

  /** Validate inputs in the Form
   *  The client must fill out each inputs
   */
  const validateInputs = () => {
    let titleError = "";
    let descriptionError = "";
    let bodyError = "";

    if (!formData.title) titleError = "Title(Text) Required";
    if (!formData.description) descriptionError = "Description(Text) Required";
    if (!formData.body) bodyError = "Body(Text) Required";

    if (titleError || descriptionError || bodyError) {
      setFormData({ ...formData, titleError, descriptionError, bodyError });
      return false;
    }
    return true;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Invoke validation method
    let validation = validateInputs();
    // If all the inputs are filled in,
    if (validation) {
      addBlogPost(formData);
      //clear form
      setFormData(initialFormData);
      //Send the client back to the home page if the form is submitted.
      history.push("/");
    }
  };

  return (
    <section className="postFormArea">
      <div>
        <div>
          <div className="headerPost">Add Post</div>
          <div>
            <form className="postForm">
              <div className="form-group"></div>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <div>
                  <input
                    id="title"
                    name="title"
                    placeholder="titlte"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <div className="error title">{formData.titleError}</div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <div>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <div className="error description">
                    {formData.descriptionError}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="body">Body:</label>
                <div>
                  <textarea
                    id="body"
                    name="body"
                    placeholder="body"
                    className="form-control"
                    value={formData.body}
                    onChange={handleChange}
                  />
                  <div className="error body">{formData.bodyError}</div>
                </div>
              </div>
              <div>
                <button onClick={handleSubmit} className="saveButton">
                  Save
                </button>
                <Link to="/">
                  <button className="cancelButton">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddPostForm;
