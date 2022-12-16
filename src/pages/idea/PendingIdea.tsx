import React, { useEffect, useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getIdeas, approveIdea, rejectIdea } from '../../redux/idea/actions'
import parser from 'html-react-parser'
import { CustomLoader } from '../../components/CustomLoader'
import { toast } from 'react-toastify'
import { categories } from '../../constants'

interface IPendingIdeaProps {}

export const PendingIdea:React.FC<IPendingIdeaProps> = () => {
    const columns = [
        {
            name: 'Posted By',
            selector: (row: any) => row.user.name,
            sortable: true,
            width: "15%"
        },
        {
            name: 'Type', 
            selector: (row: any) => categories[row.category].label, 
            sortable: true, 
            width: "10%"
        },
        {
            name: 'Github',
            selector: (row: any) => row.user.github,
            sortable: true,
            width: "15%"
        },
        {
            name: 'Title',
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: 'Content',
            selector: (row: any) => parser(row.content.slice(0, 20).concat('...')),
            sortable: true,
            width: "15%"
        },
        {
            name: 'Action',
            button: true,
            cell: (row: any) => (
                <div className='flex'>
                    <span className='btn btn-info btn-xs mr-1' onClick={() => onMoreBtn(row)}>More</span>
                    <span className='btn btn-primary btn-xs mr-1' onClick={() => onApproveBtn(row._id)}>Approve</span>
                    <span className='btn btn-error btn-xs' onClick={() => onCancelBtn(row._id)}>Cancel</span>
                </div>
            ),
            width: '20%'
        },
    ];

    const dispatch: Dispatch<any> = useDispatch()
    const ideas = useSelector((state: any) => state.idea.pending_ideas)
    const moreLabelRef = useRef<HTMLLabelElement>(null)
    const approveLabelRef = useRef<HTMLLabelElement>(null)
    const cancelRabelRef = useRef<HTMLLabelElement>(null)
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        github: '',
        title: '',
        content: ''
    })
    const [approveData, setApproveData] = useState({
        wallet: '',
        tempIndex: 0,
        tempMilestoneName: '',
        tempMilestone: 0,
        tempDate: '',
        milestone: [{ }],
        budget: '',
        ideaID: ''
    })
    const [cancelIdeaId, setCancelIdeaId] = useState('')
    useEffect(() => {
        async function fetchData() {
            await dispatch(getIdeas({ type: 'pending' }))
            setPending(false)
        }
        fetchData()
    }, [])

    const onMoreBtn = (formData: any) => {
        setFormData({
            name: formData.user.name,
            github: formData.user.github,
            title: formData.title,
            content: formData.content
        })
        moreLabelRef.current?.click()
    }
    const onApproveBtn = (ideaID: string) => {
        console.log("idea ID: "+ideaID)
        setApproveData({ 
            wallet: '',
            tempIndex: 0,
            tempMilestoneName: '',
            tempMilestone: 0,
            tempDate: '',
            milestone: [],
            budget: '',
            ideaID
        });
        approveLabelRef.current?.click()
    }
    const onCancelBtn = (ideaID: string) => {
        setCancelIdeaId(ideaID)
        cancelRabelRef.current?.click()
    }
    const onChange = (e: any) => {
        setApproveData({ ...approveData, [e.target.name]: e.target.value })
    }
    const milestoneAdd = () => {
        setApproveData({ ...approveData, tempDate: '', tempMilestoneName: '', tempMilestone: 0, tempIndex: approveData.tempIndex+1, milestone: [...approveData.milestone, {index: approveData.tempIndex, title: approveData.tempMilestoneName, date: approveData.tempDate, amount: approveData.tempMilestone}] })
    }
    const milestoneRemove = () => {
        setApproveData({ ...approveData, tempDate: '', tempMilestoneName: '', tempMilestone: 0, tempIndex: approveData.tempIndex-1, milestone: approveData.milestone.filter((item: any) => item.index !== approveData.tempIndex-1) })
    }
    const onApproveSubmit = async () => {
        setLoading(true)
        await dispatch(approveIdea(approveData))
        approveLabelRef.current?.click()
        setLoading(false)
    }
    const onCancelSubmit = async () => {
        console.log(cancelIdeaId);
        setLoading(true)
        await dispatch(rejectIdea({ ideaId: cancelIdeaId }))
        cancelRabelRef.current?.click()
        setLoading(false)
    }

    return (
        <div className="hero">
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <DataTable
                            columns={columns}
                            data={ideas} 
                            pagination 
                            highlightOnHover={true} 
                            progressPending={pending}
                            progressComponent={<CustomLoader />}
                            responsive={true} 
                            striped={true}
                        />
                    </div>
                </div>
            </div>

            {/* more info modal */}
            <label htmlFor="moreInfoModal" className="btn hidden" ref={moreLabelRef}>open modal</label>
            <input type="checkbox" id="moreInfoModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Name:</span>
                        </label>
                        <label className='w-8/12'>{formData.name}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Github:</span>
                        </label>
                        <label className='w-8/12'>{formData.github}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Title:</span>
                        </label>
                        <label className='w-8/12'>{formData.title}</label>
                    </div>
                    <div className='flex items-start pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Content:</span>
                        </label>
                        <label className='w-8/12'>{parser(formData.content)}</label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="moreInfoModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* more info modal */}

            {/* approve modal */}
            <label htmlFor="approveModal" className="btn hidden" ref={approveLabelRef}>open modal</label>
            <input type="checkbox" id="approveModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Wallet:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Wallet" 
                            className="input input-bordered w-8/12" 
                            name="wallet" 
                            value={approveData.wallet} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Budget:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Budget" 
                            className="input input-bordered w-8/12" 
                            name="budget" 
                            value={approveData.budget} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Milestone:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Milestone name" 
                            className="input input-bordered w-8/12" 
                            name="tempMilestoneName" 
                            value={approveData.tempMilestoneName} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12"></label>
                        <div className='w-8/12'>
                            <input 
                                type="number" 
                                placeholder="Milestone" 
                                className="input input-bordered w-4/12 mr-2" 
                                name="tempMilestone" 
                                value={approveData.tempMilestone} 
                                onChange={onChange}
                            />
                            <input 
                                type="date" 
                                placeholder="Date" 
                                className="input input-bordered w-7/12" 
                                name="tempDate" 
                                value={approveData.tempDate} 
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12"></label>
                        <div className='w-8/12'>
                            <button className='btn btn-xs mr-1' onClick={() => milestoneAdd()}>Add</button>
                            <button className='btn btn-xs' onClick={() => milestoneRemove()}>Remove</button>
                        </div>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12"></label>
                        <div className='w-8/12'>
                            {approveData.milestone.map((item: any, index: number) => (
                                <div key={index}>
                                    <label className='font-bold flex'>Milestone {item.index+1}:</label> 
                                    <p><label className='font-medium'>title: </label><label className='mr-3'>{item.title}</label></p>
                                    <label className='font-medium'>date: </label><label className='mr-3'>{item.date}</label>
                                    <label className='font-medium'>amount: </label> <label>{item.amount}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-action">
                        <label className={`btn ${loading ? 'loading' : ''}`} onClick={() => onApproveSubmit()}>Approve</label>
                        <label htmlFor="approveModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* approve modal */}

            {/* cancel modal */}
            <label htmlFor="cancelModal" className="btn hidden" ref={cancelRabelRef}>open modal</label>
            <input type="checkbox" id="cancelModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                    <div className='flex items-center pb-2'>
                        <label className="label w-12/12">
                            <span className="label-text font-bold text-xl">Are you going to reject this idea?</span>
                        </label>
                    </div>
                    <div className="modal-action">
                        <label className={`btn ${loading ? 'loading' : ''}`} onClick={() => onCancelSubmit()}>Yes</label>
                        <label htmlFor="cancelModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* cancel modal */}


        </div>
    )
}