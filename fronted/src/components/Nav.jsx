import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    Form,
    Button,
  } from "react-bootstrap";


const WebsiteNav = () => {
    return (
        <>
    
        <header>
        <Navbar  bg="light" expand="lg">
  <Navbar.Brand className="mx-5" to="/">Forest Fire</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse className="d-flex justify-content-between"  id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
     <Link to="/" className="nav-link">Home</Link>
     <Link to="reports" className="nav-link">Reports</Link>
     <Link to="news" className="nav-link">News</Link>
     <Link to="Awareness" className="nav-link">Awareness</Link>
     
      
    </Nav>
    <Form className="d-flex">
    <Link to="sign-up" className="mx-1"><Button variant="outline-warning" >Sign Up</Button></Link>
    <Link to="sign-in" className="mx-1"><Button variant="outline-warning">Sign In</Button></Link>
    </Form>
    
  </Navbar.Collapse>
</Navbar>
       
        </header>
        </>
    )
}
export default WebsiteNav;