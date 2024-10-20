"use client"
import React, { useRef, useState } from "react";
import MainHeader from '../common/MainHeader';
import useStore from "@/stores/useStore";
import { stripIndent, oneLine } from "common-tags";
import ReactPlayer from 'react-player'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Index = () => {
  const { profile, matchContents } = useStore((state) => ({
    profile: state.profile,
    matchContents: state.matchContents,
  }));
  const inputRef = useRef(null);
  const [answers, setAnswer] = useState([]);
  const [searchQueary, setSearchQueary] = useState();
  const [questions, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const searchText = inputRef.current.value;
    if (searchText && searchText.trim()) {
      setQuestion((currentQuestion) => [...currentQuestion, searchText]);
      const res = await fetch(location.origin + "/api/embedding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: searchText.replace(/\n/g, " ") }),
      });
      if (res.status !== 200) {
        toast.error("Failed to generate answer", {
          autoClose: 1000,
        });
      } else {
        const data = await res.json();
        const documents = await matchContents(data);
        let tokenCount = 0;
        let contextText = "";
        let videoUrl = null;

        for (let i = 0; i < documents.length; i++) {
          const document = documents[i];
          const content = document.content;
          tokenCount += document.token;

          if (tokenCount > 1500) {
            break;
          }
          const videoUrlMatch = content.match(/https?:\/\/\S+/);
          if (videoUrlMatch) {
            videoUrl = videoUrlMatch[0];
            break;
          }
          contextText += `${content.trim()}\n--\n`;
        }

        if (videoUrl) {
          setAnswer((currentAnswer) => [
            ...currentAnswer,
            { type: "video", url: videoUrl },
          ]);
        } else if (contextText) {
          const prompt = generatePrompt(contextText, searchText);
          await generateAnswer(prompt);
        } else {
          setAnswer((currentAnswer) => [
            ...currentAnswer,
            "I'm sorry, I don't know how to answer that question yet, try another question.",
          ]);
        }
      }
    }
    setSearchQueary("");
    setLoading(false);
  };

  const generateAnswer = async (prompt) => {
    const res = await fetch(location.origin + "/api/description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (res.status !== 200) {
      toast.error("Failed to generate answer");
    } else {
      const data = await res.json();
      setAnswer((currentAnswer) => [...currentAnswer, data.choices[0].text]);
    }
  };

  const generatePrompt = (contextText, searchText) => {
    const prompt = stripIndent`
            Context sections:
            ${contextText}

            Question"""
            ${searchText}
            """
            Answer as markdown`;
    return prompt;
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
        <div className="card p-3 mb-3 form-group">
          <h4 className="text-center mb-4">
            Hi, {profile?.first_name}{" "} I'm Kenny's assistant. How may I help you?
          </h4>
          <form style={{ display: "grid", gap: "10px" }}>
            {questions.map((question, index) => {
              const answer = answers[index];
              const isLoading = loading && !answer;
              return (
                <div className="space-y-3" key={index}>
                  <div className="flex items-center gap-2 text-indigo-500">
                    <p>
                      {/* <PiSealQuestionThin
                        style={{ fontSize: "20px", marginRight: 5 }}
                      /> */}
                      <strong>{question}</strong>
                    </p>
                  </div>
                  {isLoading ? (
                    <p>
                      <em>Generating answer...</em>
                    </p>
                  ) : (
                    <>
                      {answer?.type === "video" ? (
                        <div className="video-container">
                          <ReactPlayer
                            url={answer.url.replace("dl=0", "dl=1")}
                            width={400}
                            height={200}
                            controls
                          />
                        </div>
                      ) : (
                        <p>{answer}</p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            <div className="form-group mb-3">
              <textarea
                ref={inputRef}
                className="form-control"
                placeholder="Talk to Kenny..."
                wrap="hard"
                id="questions"
                name="questions"
                required
                value={searchQueary}
                style={{
                  width: "100%",
                  height: "4em",
                  maxHeight: "12em",
                  resize: "vertical",
                  overflow: "auto",
                }}
                onInput={(event) => {
                  event.target.style.height = "6em";
                  event.target.style.height = `${event.target.scrollHeight}px`;
                }}
                onChange={(e) => setSearchQueary(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              ></textarea>
            </div>
            <div className="mb-2 text-end">
              <button
                className="btn btn-outline-warning me-2"
                onClick={()=> setSearchQueary("")}
              >
                Cancel
              </button>
              <button
                className="btn btn-thm btn-outline-success"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
