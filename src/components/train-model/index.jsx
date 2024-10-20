"use client"
import React, { useRef, useState } from "react";
import MainHeader from "../common/MainHeader";
import useStore from "@/stores/useStore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const inputRef = useRef(null);
    const { profile, addDataset } = useStore(
      (state) => ({
        profile: state.profile,
        addDataset: state.addDataset
      })
    );

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
      setLoading(true);
      const content = inputRef.current.value;
      if (content && content.trim()) {
        const res = await fetch(location.origin + "/api/embedding", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
        },
          body: JSON.stringify({ text: content.replace(/\n/g, " ") }),
        });
        if (res.status !== 200) {
          toast.error("Failed to create embedding");
        } else {
          const result = await res.json();
          const datasetPayload = {
            content: content,
            embedding: result.embedding,
          };
          const suc = await addDataset(datasetPayload);
          if (suc) {
            toast.success("Successfully created embedding.");
            inputRef.current.value = "";
          }
        }
      }
      setLoading(false);
    };

  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/ai_assistance.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <MainHeader />
      <ToastContainer />
      <div className={`container`}>
        <div className="card p-3 mb-3">
          <div className="modal-body p30">
            <h4
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            Welcome {profile?.first_name} {" "} to Daily Kenny's dataset
            </h4>
              <form >
                <div className="row form-group mb-5">
                  <div className="form-group">
                    <textarea
                      ref={inputRef}
                      className="form-control"
                      placeholder="Add your dataset..."
                      wrap="hard"
                      id="dataset"
                      name="dataset"
                      required
                      style={{
                        width: "100%",
                        height: "6em",
                        maxHeight: "15em",
                        resize: "vertical",
                        overflow: "auto",
                      }}
                      onInput={(event) => {
                        event.target.style.height = "6em";
                        event.target.style.height = `${event.target.scrollHeight}px`;
                      }}
                      ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer form-group mb-2">
                <button
                    className="btn btn-thm float-end btn-outline-success btn-block form-control"
                    onClick={handleSave}
                >
                {loading && (
                    <>loading...</>
                )}
                Save
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
