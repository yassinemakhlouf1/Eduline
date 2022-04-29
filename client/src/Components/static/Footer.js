import React from 'react'

export default function Footer() {
  return (
    <>
    <section className="info_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="info_menu">
            <h5>
              QUICK LINKS
            </h5>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/DomainsAs"> Courses </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/DomainsAs"> Courses </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forums"> Forums </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact us</a>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_course">
            <h5>
              TOP RATED COURSE
            </h5>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humou
            </p>
          </div>
        </div>

        <div className="col-md-5 offset-md-1">
          <div className="info_news">
            <h5>
              FOR ANY QUERY, PLEASE WRITE TO US
            </h5>
            <div className="info_contact">
              
              <a>
                EdulineInfo@gmail.com
              </a>
              <a>
                Call : +216 93493156
              </a>
            </div>
            <form action="">
              <input type="text" placeholder="Enter Your email" />
              <button>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
	<footer className="container-fluid footer_section">
    <p>
      &copy; 2021 All Rights Reserved By Eduline
    </p>
  </footer>
  </>
  )
}
