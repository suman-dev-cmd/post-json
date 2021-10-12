import { useState, useEffect, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getPosts, addPosts,deletePosts,updatePosts } from './reduxSlice/postSlice';
import type { Post } from "./reduxSlice/postSlice";

import {
  Formik,
  Form,
  Field
} from "formik";

const Postlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const [post,setPost] = useState<Post>();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const postsitem = useAppSelector((state) => state.posts.postsitem);
  // console.log(postsitem);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const initialValues: Post = {
    userId: post?post.userId:Math.floor(100000 + Math.random() * 900000),
    id: post?post.id:Math.floor(100000 + Math.random() * 900000),
    title: post?post.title:"",
    body: post?post.body:"",
  };
  const deleteItem =(id:number)=>{
    dispatch(deletePosts({id}))
  }
  const editItem =(obj:Post)=>{
    setPost(obj);
    setModal(true);
  }
  return (
    <>
      <div>
        <h1>Post List</h1>
      </div>

      <div style={{ float: "right" }}>
        <button type="button" className="btn btn-success" onClick={toggle}>
          Add Post
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"> Id</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {postsitem.length > 0 &&
            postsitem.slice(0).reverse().map((obj:Post, i) => (
              <tr key={i}>
                <th scope="row">{obj.id}</th>
                <td>{obj.title}</td>
                <td>{obj.body}</td>
                <td>
                  <a onClick={()=>editItem(obj)}>
                    <i className="fa fa-edit p-2" style={{cursor:'pointer'}}>
                    </i>
                  </a>
                  <a onClick={()=>deleteItem(obj.id)}>
                    <i className="fa fa-trash" style={{cursor:'pointer'}} ></i>
                  </a>
                 
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log(values);
              const data = values;
              if(post?.id){
                dispatch(updatePosts({data}));
                actions.setSubmitting(false);
                setModal(false);
              }else{
                dispatch(addPosts({data}));
                actions.setSubmitting(false);
                setModal(false);
              }
             
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <Field
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                />
                <label htmlFor="body">Body</label>
                <Field
                  id="body"
                  name="body"
                  placeholder="Body"
                  className="form-control"
                  value={values.body}
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default Postlist;
