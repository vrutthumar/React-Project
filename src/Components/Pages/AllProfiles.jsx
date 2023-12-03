
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { callApi, deleteUser, editUser, postApi } from './redux/action/action';
import { HOC } from '../DashBoard/HOC';
import ProfileValidation from './ProfileValidation.json'
import moment from 'moment';
// import { deletedata, deleteuser, editdata, getApi, postapi } from '../redux/action/apiaction';

function AllProfiles() {
    let [errorMsg, seterrorMsg] = useState({})
    let [bankerror, setbankerror] = useState({})

    let [blankObj, setblankObj] = useState({ idNumber: "", displayName: "", email: "", alternativeName: "", chineseName: "", artistName: "", birthdate: "", address: "", contractStartDate: "", contractEndDate: "", bankDetails: "" })
    let [obj, setobj] = useState({ idNumber: "", displayName: "", email: "", alternativeName: "", chineseName: "", artistName: "", birthdate: "", address: "", contractStartDate: "", contractEndDate: "" })
    let [bankObj, setbankObj] = useState({ bankInfo: "", bankAddress: "", cardHolder: "", cardType: "", cardNo: "", tel: "" })
    let [blankBankObj, setblankBankObj] = useState({ bankInfo: "", bankAddress: "", cardHolder: "", cardType: "", cardNo: "", tel: "" })
    let [bankdetailsObj, setbankdetailsObj] = useState({})
    const state = useSelector(state => state.api)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [showBank, setshowBank] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const hideBankDetails = () => setshowBank(false);

    const handleShow = () => {
        setShow(true);
    };
    const handleShow1 = () => {
        setShow1(true);
    };

    const showBankDetails = (e) => {
        setshowBank(true)
        bankdetailsObj = e[0]
        setbankdetailsObj({ ...bankdetailsObj })

    }
    let profileData = async (e) => {


        obj[e.target.name] = e.target.value;

        setobj({ ...obj })

        validateForm(e.target.name, 0)


    }
    let bankDetails = async (e) => {


        bankObj[e.target.name] = e.target.value;

        setbankObj({ ...bankObj })
        validateForm(e.target.name, 1)


    }
    const save = () => {
        if (obj.id == undefined) {

            Object.keys(obj).forEach((x) => validateForm(x, 0))
            if(obj['bankDetails'] == [] || obj['bankDetails'] == undefined)
            {
                errorMsg['bankDetails'] = 'Required*'
    
            }
            else {
                delete errorMsg['bankDetails'];
            }
            seterrorMsg({...errorMsg    })
        }
        if (Object.keys(errorMsg).length == 0) {
            
            if (obj.id != undefined && obj.id != 0)  {
                obj.bankDetails = obj.profileBankAssociateResponses
                obj.role = obj.profileRoleAssociateResponses
                setobj({...obj})
                dispatch(editUser(obj))
            }
            else {
                obj['advanceType'] = 1
                obj["advanceAmount"] = 0
                obj["contractTotalMonths"] = 0
                obj["userId"] = 0
                obj["profileImageBase64"] = "string"
                obj["id"] = 0
                obj["role"] = [
                    {
                        "profileRoleAssociateId": 0,
                        "profileId": 0,
                        "roleType": 1
                    }
                ]
                setobj({ ...obj })
                dispatch(postApi(obj))
            }

            setobj({ ...blankObj })
            handleClose();

        }


    }
    const saveBankDetails = () => {
        
        if (bankObj.profileId == undefined ) {

            Object.keys(bankObj).forEach((x) => validateForm(x, 1))
        }
        if (Object.keys(bankerror).length == 0) {
            bankObj["profileBankAssociateId"] = 0
            bankObj["profileId"] = 0
            setbankObj({ ...bankObj })
            obj['bankDetails'] = [{ ...bankObj }]
            setobj({ ...obj })
            setbankObj({ ...blankBankObj })
            delete errorMsg['bankDetails'];
            handleClose1();

        }

    }
    const editData = (editObj) => {
        setShow(true);
        bankObj = editObj.profileBankAssociateResponses[0]
        setbankObj({ ...bankObj })
        // editid.id = editid._id
        setobj({ ...editObj })

    }

    const deleteData = (id) => {

        if(window.confirm("Are You Sure you Want to delete Data??"))
        {
            dispatch(deleteUser(id))
        }
    }

    const validateForm = (name, i) => {
        let err = ""
        if (i == 0) {
            err = errorMsg
        }
        else {
            err = bankerror
        }
        let validationObj = ProfileValidation[i].find((x) => x.name == name)
        let condition = validationObj.condition.find(x => eval(x.condition))
        if (condition) {
            err[name] = condition.error

        }
        else {
            delete err[name];
        }
        if (i == 0) {
            seterrorMsg({ ...err })
        }
        else {
            setbankerror({ ...err })
        }

    }


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <>

            <div className='d-flex align-items-center justify-content-between p-3 '>
                <h3>All Profiles</h3>
                <button className='btn btn-outline-primary' onClick={handleShow}>
                    Add Data
                </button>
            </div>

            <Modal show={show} onHide={handleClose} size='lg' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label className='d-block fw-bold'>Id</Form.Label>
                    <Form.Control type="text" name='idNumber' onChange={profileData} value={obj.idNumber ?? ""} />
                    <p className='text-danger'>{errorMsg.idNumber}</p>
                    <Form.Label className='d-block fw-bold'>Name</Form.Label>
                    <Form.Control type="text" name='displayName' onChange={profileData} value={obj.displayName ?? ""} />
                    <p className='text-danger'>{errorMsg.displayName}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Email</Form.Label>
                    <Form.Control type="email" name='email' onChange={profileData} value={obj.email ?? ""} />
                    <p className='text-danger'>{errorMsg.email}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Alternative Name</Form.Label>
                    <Form.Control type="text" name='alternativeName' onChange={profileData} value={obj.alternativeName ?? ""} />
                    <p className='text-danger'>{errorMsg.alternativeName}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Chinese Name</Form.Label>
                    <Form.Control type="text" name='chineseName' onChange={profileData} value={obj.chineseName ?? ""} />
                    <p className='text-danger'>{errorMsg.chineseName}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Artist Name</Form.Label>
                    <Form.Control type="text" name='artistName' onChange={profileData} value={obj.artistName ?? ""} />
                    <p className='text-danger'>{errorMsg.artistName}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Birth Date</Form.Label>
                    <Form.Control type="date" name='birthdate' onChange={profileData} value={moment(obj.birthdate).format(moment.HTML5_FMT.DATE) ?? ""} />
                    <p className='text-danger'>{errorMsg.birthdate}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Address</Form.Label>
                    <Form.Control as="textarea" name='address' rows={3} onChange={profileData} value={obj.address ?? ""} />
                    <p className='text-danger'>{errorMsg.address}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Contract Start Date</Form.Label>
                    <Form.Control type="date" name='contractStartDate' onChange={profileData} value={moment(obj.contractStartDate).format(moment.HTML5_FMT.DATE) ?? ""} />
                    <p className='text-danger'>{errorMsg.contractStartDate}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Contract End Date</Form.Label>
                    <Form.Control type="date" name='contractEndDate' onChange={profileData} value={moment(obj.contractEndDate).format(moment.HTML5_FMT.DATE) ?? ""} />
                    <p className='text-danger'>{errorMsg.contractEndDate}</p>
                    <div>
                        <Form.Label className=' fw-bold mt-3 me-5'>Add Bank Details</Form.Label>
                        <button onClick={handleShow1} className='btn btn-outline-primary'>
                            Add Details
                        </button>
                        <p className='text-danger'>{errorMsg.bankDetails}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-primary' onClick={() => { save() }} type='button'>Save Changes</button>
                </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Bank Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label className='d-block fw-bold mt-2'>Bank Info</Form.Label>
                    <Form.Control name='bankInfo' onChange={bankDetails} value={bankObj.bankInfo ?? ""} />
                    <p className='text-danger'>{bankerror.bankInfo}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Bank Address</Form.Label>
                    <Form.Control as="textarea" name='bankAddress' rows={3} onChange={bankDetails} value={bankObj.bankAddress ?? ""} />
                    <p className='text-danger'>{bankerror.bankAddress}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Card Holder</Form.Label>
                    <Form.Control name='cardHolder' onChange={bankDetails} value={bankObj.cardHolder ?? ""} />
                    <p className='text-danger'>{bankerror.cardHolder}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Card Type</Form.Label>
                    <Form.Select onChange={bankDetails} name='cardType'>
                        <option>Select Card Type</option>
                        <option value="VISA" selected={bankObj.cardType == "VISA"}>VISA</option>
                        <option value="MASTERCARD" 
                        >MASTERCARD</option>
                        <option value="MAESTRO" selected={bankObj.cardType == "MAESTRO"}>MAESTRO</option>
                        <option value="RUPAY" selected={bankObj.cardType == "RUPAY"}>RUPAY</option>
                    </Form.Select>
                    <p className='text-danger'>{bankerror.cardType}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Card No</Form.Label>
                    <Form.Control name='cardNo' type='text' onChange={bankDetails} value={bankObj.cardNo ?? ""} />
                    <p className='text-danger'>{bankerror.cardNo}</p>
                    <Form.Label className='d-block fw-bold mt-2'>Tel</Form.Label>
                    <Form.Control name='tel' type='tel' onChange={bankDetails} value={bankObj.tel ?? ""} />
                    <p className='text-danger'>{bankerror.tel}</p>
                </Modal.Body>
                <Modal.Footer>

                    <button className='btn btn-outline-primary' onClick={saveBankDetails}>
                        Save Details
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showBank} onHide={hideBankDetails} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Bank Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='table mb-0 table-striped '>
                        <tr>
                            <td className='d-flex justify-content-around'><span className=' bg-transparent'>Bank Info</span><span className=' bg-transparent'>:</span></td>
                            <td className=''>{bankdetailsObj.bankInfo}</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-around'><span className=' bg-transparent'>Bank Address</span><span className=' bg-transparent'>:</span></td>
                            <td className=''>{bankdetailsObj.bankAddress}</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-around'><span className=' bg-transparent'>Card Holder</span><span className=' bg-transparent'>:</span></td>
                            <td className=''>{bankdetailsObj.cardHolder}</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-around'><span className=' bg-transparent'>Card Type</span><span className=' bg-transparent'>:</span></td>
                            <td className=''>{bankdetailsObj.cardType}</td>
                        </tr>

                        <tr>
                            <td className='d-flex justify-content-around'><span className=' bg-transparent'>Card No</span><span className=' bg-transparent'>:</span></td>
                            <td className=''>{bankdetailsObj.cardNo}</td>
                        </tr>
                        <tr>
                            <td className='d-flex justify-content-around'><span className=' bg-transparent'>Tel</span><span className=' bg-transparent'>:</span></td>
                            <td className=''>{bankdetailsObj.tel}</td>
                        </tr>


                    </table>
                </Modal.Body>
                <Modal.Footer>

                    <button className='btn btn-outline-primary' onClick={hideBankDetails}>
                        Hide Details
                    </button>
                </Modal.Footer>
            </Modal>


            <table className='border border-3 text-center table profile-table' >
                <thead>
                    <tr>
                        <th className='border border-3 text-nowrap'>Id </th>
                        <th className='border border-3 text-nowrap'>Id Number</th>
                        <th className='border border-3 text-nowrap'>Display Name</th>
                        <th className='border border-3 text-nowrap'>Alternative Name</th>
                        <th className='border border-3 text-nowrap'>Email</th>
                        <th className='border border-3 text-nowrap'>Birth Date</th>
                        <th className='border border-3 text-nowrap'>Contract Start Date</th>
                        <th className='border border-3 text-nowrap'>Contract End Date</th>
                        <th className='border border-3 text-nowrap'>Chinese Name</th>
                        <th className='border border-3 text-nowrap'>Artist Name</th>
                        <th className='border border-3 text-nowrap'>Bank Details</th>
                        <th className='border border-3 text-nowrap'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state?.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td className='border border-3 text-nowrap'>{x.id}</td>
                                    <td className='border border-3 text-nowrap'>{x.idNumber}</td>
                                    <td className='border border-3 text-nowrap'>{x.displayName}</td>
                                    <td className='border border-3 text-nowrap'>{x.alternativeName}</td>
                                    <td className='border border-3 text-nowrap'>{x.email}</td>
                                    <td className='border border-3 text-nowrap'>{x.birthdate}</td>
                                    <td className='border border-3 text-nowrap'>{x.contractStartDate}</td>
                                    <td className='border border-3 text-nowrap'>{x.contractEndDate}</td>
                                    <td className='border border-3 text-nowrap'>{x.chineseName}</td>
                                    <td className='border border-3 text-nowrap'>{x.artistName}</td>
                                    <td className='border border-3 text-nowrap'>
                                        <button type="button" onClick={(e) => showBankDetails(x.profileBankAssociateResponses)} className='btn btn-outline-primary mx-2 px-3'>Show Details</button>
                                    </td>
                                    <td className='border border-3 text-nowrap'>
                                        <button type="button" onClick={() => editData(x)} className='btn btn-outline-success mx-2 px-3'>Edit</button>
                                        <button type="button" onClick={() => deleteData(x.id)} className='btn btn-outline-danger mx-2 px-3'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>




        </>
    )
}

export default HOC(AllProfiles)

