{/*<div className="main">
      <div className="main-container">
        <div style={{ flexDirection: "column", }} className="all-questions">
          <p style={{ marginBottom: "20px", fontSize: "1.3rem", fontWeight: "300", }} >
            {forum && forum?.answerDetails.length} Answers
          </p>
          {forum?.answerDetails.map((_q) => (
            <>
              <div style={{ borderBottom: "1px solid #eee", }} key={_q._id} className="all-questions-container" >
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>
                  </div>
                </div>
                <div className="question-answer">
                  {ReactHtmlParser(_q.answer)}
                  <div className="author">
                    <small>
                      asked {new Date(_q.createdAt).toLocaleString()}
                    </small>
                    <div className="auth-details">
                      <Avatar {...stringAvatar(_q?.name)} />
                      <p>
                        {_q?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3 style={{ fontSize: "22px", margin: "10px 0", fontWeight: "400", }} >
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          modules={Editor.modules}
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "100px", maxWidth: "fit-content", }} >
        Post your answer
      </button>
    </div>*/}