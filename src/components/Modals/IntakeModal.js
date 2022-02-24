import React,{ useState } from 'react'
import { useHistory } from 'react-router'
import Tippy from '@tippyjs/react'
import './intakeModal.css'
import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import "bootstrap/dist/css/bootstrap.min.css";
import 'tippy.js/dist/tippy.css'
import PVModal from './PVModal';
import EVModal from './EVModal';
import DataModal from './dataModal'
import ResilencyModal from './resilencyModal';
import Navbar from '../navbar'
import axios from 'axios';

var Options = [{
  value: "warehouse",
  
  value: "Small Office",
  
},{
  value: "Medium office",
 
},,{
  value: "Large office",
 
},{
  value: "Primary school",
 
},{
  value: "Secondary school",
 
},{
  value: "Stand-alone retail",
 
},{
  value: "SuperMarket",
 
},{
  value: "Strip Mall",
 
},{
  value: "Full Service Restaurant",
 
},{
  value: "Quick Service Restaurant",
 
},{
  value: "Hospital",
 
},{
  value: "Small Hotel",
 
},{
  value: "Large Hotel",
 
},{
  value: "Midrise Apartment",
 
},{
  value: "Outpatient Health Care",
 
}]
function IntakeModal() {
  
  
  const [validated, setValidated] = useState(false);
  const [cname,setcName] = useState("");
  const [contact_name,setcontact_name] = useState("");
  const [sitename,setsitename] = useState("");
  const [siteaddress,setsiteaddress] = useState("");
  const [emailaddress,setemailaddress] = useState("");
  const [comp_contactno,setcomp_contactno] = useState("");
  const [utillityname,setutillityname] = useState("");
  const [category,setcategory] = useState("");

  const history = useHistory()

  const[show,setShow] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

 
  return (
    <>    
     <Navbar /><br/>
       <div className='main-modal'>
      <Form className='form-main' noValidate validated={validated} method="POST" onSubmit={handleSubmit}>

      <h4 className='info-title'>General-information</h4>
  <Form.Group className="mb-3" >
    <Form.Label>Company Name*</Form.Label>
    <Form.Control type="text" placeholder="e.g Gridscape Solutions" className='formcont' name='cname' value={cname} onChange={(e)=> setcName(e.target.value)} required />
    
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Site Name*</Form.Label>
    <Form.Control type="text" placeholder="e.g Gridscape" className='formcont' name='sitename'  value={sitename} onChange={(e)=> setsitename(e.target.value)} required/>
    
  </Form.Group>
  <label htmlFor="group14" className='PVEV'>Site type*</label> <br/>
  {[ 'radio'].map((type) => (
         <div key={`inline-${type}`} className="mb-3" >
      <Form.Check
        inline
        label="Non Residential"
        name="group14"
        onChange={()=>{ setShow(true);}}
        checked={show==true}
         value = {true}
         
       
        type={type}
        id={`inline-${type}-3`} required
      />
       <Form.Check
        inline
        label="Residential"
        name="group14"
        onChange={()=>{ setShow(false);}}
        type={type}
        id={`inline-${type}-4`}
         required
      /> 
      </div>
        ))}
          {show==true ? <Select /> : null}

  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Site Address*</Form.Label>
    <Form.Control name='siteaddress' value={siteaddress} onChange={(e)=> setsiteaddress(e.target.value)}  className='formcont' as="textarea" rows={3} pattern='[A-Za-z0-9\.\-\s\,]' placeholder=' 30, 2nd Floor, Bhagat Colony, near Sushan Circle, Makarpura, Vadodara, Gujarat 390010'/>
    <Form.Control.Feedback type="invalid">
    Please enter a valid name 
    </Form.Control.Feedback>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Contact person*</Form.Label>
    <Form.Control type="text" placeholder="Enter name" name='contact_name' value={contact_name} onChange={(e)=> setcontact_name(e.target.value)} className='formcont' maxLength={20} minLength={3} required/>
    <Form.Control.Feedback type="invalid">
    Please enter a valid name 
    </Form.Control.Feedback>
  </Form.Group>
  <InputGroup hasValidation>
  <Form.Group className="mb-3" controlId="validationCustom05" >
    <Form.Label>Email address*</Form.Label>
    
    <Form.Control type="text" placeholder="Enter email" pattern='[^@]+@[^@]+\.[^@]+' className='form-control2' name='emailaddress' value={emailaddress} onChange={(e)=>setemailaddress(e.target.value)}   required />
      <Form.Control.Feedback type="invalid">
    Please enter a valid email address
    </Form.Control.Feedback>
  </Form.Group>
  </InputGroup>
  <Form.Group className="mb-3" >
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="text" placeholder="(Optional)" className='formcont' minLength={10} maxLength={10} name='comp_contactno' value={comp_contactno} onChange={(e)=> setcomp_contactno(e.target.value)} pattern="[0-9]{10}"/>
  </Form.Group>
  <h5 className='info-title'>Utillity Details* <Tippy content='Please refer to your electric bills for this information'><button className='t'>?</button></Tippy></h5>
  <Form.Select aria-label="Default select example" className='Select' name='utillityname' value={utillityname} onChange={(e)=> setutillityname(e.target.value)}  required>
  <option>Select utillity</option>
  <option value="PG & E">PG & E</option>
  <option value="SCE">SCE</option>
  <option value="SDGE">SDGE</option>
  <Form.Control.Feedback type="invalid">
    Please select a valid utillity
    </Form.Control.Feedback>
</Form.Select><br/>
    <DataModal />
 
  <label htmlFor="group1" className='PVEV'>Does the site has existing PV?*</label> <br/>
  
   <PVModal/>
   <h4 className='info-title'>Desired PV Details</h4>
        <label htmlFor="group3">Desired PV types</label>
        {[ 'checkbox'].map((type) => (
         <div key={`inline-${type}`} className="mb-3">
           
      <Form.Check
        inline
        label="Carport"
        name="group3"
        
        type={type}
        id={`inline-${type}-3`}
        required
      /> <br/>
       <Form.Check
        inline
        label="Rooftop"
        name="group3"
        type={type}
        id={`inline-${type}-3`}
      /> <br/>
       <Form.Check
        inline
        label="GroundMount"
        name="group3"
        type={type}
        id={`inline-${type}-3`}
      /> 
      </div>
        ))}
           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Desired PV Description</Form.Label><br/>
    <Form.Text className="text-muted">
      A. Specific locations/areas which are available/not available for PV <br/>B. Priority for the areas/locations that needs to be used
</Form.Text>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  <label htmlFor="group4" className='PVEV'>Does the site has existing EV?*</label> 
  <EVModal />
  <label htmlFor="group7" className='PVEV'>Do you want to meet resiliency goals?*</label>
  <ResilencyModal />
  <div className='buttons'>
  <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button' >Cancel</button></Tippy>        
          <button className='save' value="Post"  htmlType="submit" onClick={onClick}>Save</button> 
        
        </div><br/>
       
</Form>
     
        
          
        
     
</div> 
  </>
  )
}

 const Select = ()=>(
   <div>
   <label htmlFor='category'>Select Non residential site type</label><br/><br/>
  <select className='site-type2' name='category' value={category} onChange={(e)=> setcategory(e.target.value)}>
  {
    Options.map((opt) => {
      return <option key={opt.value} value={opt.value}>{opt.value}</option>
       })
  } 
</select>
</div>
 )
      
 const onClick(ev) = async () => {
  let formField = new FormData()
  formField.append('cname',cname)
  formField.append('contact_name',contact_name)
  formField.append('sitename',sitename)
  formField.append('siteaddress',siteaddress)
  formField.append('emailaddress',emailaddress)
  formField.append('comp_contactno',comp_contactno)
  formField.append('utillityname',utillityname)
  formField.append('category',category)
   
}
  await axios({
    method:'post',
    url:'localhost:8000/add-new-site',
    data: formField
  }).then((res)=>{
    console.log(res.data);
    history.push('/');
  })
   
export default IntakeModal