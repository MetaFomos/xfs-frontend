import React, {useEffect, useRef, useState} from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getIdeas, proposalIdea } from '../../redux/idea/actions'
import parser from 'html-react-parser'
import { CustomLoader } from '../../components/CustomLoader'
import { categories } from '../../constants'

interface IApprovedIdeaProps {}

export const ApprovedIdea:React.FC<IApprovedIdeaProps> = () => {
    const columns = [
        {
            name: 'Posted Name',
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
                    <button className='btn btn-xs' onClick={() => onProposalBtn(row)}>Submit Proposal</button>
                </div>
            ),
            width: '20%'
        },
    ];

    const dispatch: Dispatch<any> = useDispatch()
    const ideas = useSelector((state: any) => state.idea.approved_ideas)
    const proposalLabelRef = useRef<HTMLLabelElement>(null)
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(true)
    const [proposal, setProposal] = useState('')
    const [approveData, setApproveData] = useState({
        wallet: '',
        milestone: [{ }],
        budget: '',
        ideaID: ''
    })
    const onProposalBtn = (row: any) => {
        console.log("idea ID: "+row._id)
        setProposal('')
        setApproveData({ 
            wallet: row.wallet,
            milestone: row.milestone,
            budget: row.budget,
            ideaID: row._id
        })
        proposalLabelRef.current?.click()
    }
    const onChangeProposal = (e: any) => {
        setProposal(e.target.value)
    }
    useEffect(() => {
        async function fetchData() {
            await dispatch(getIdeas({ type: 'approved' }))
            setPending(false)
        }
        fetchData()
    }, [])

    const onProposalSubmit = async () => {
        setLoading(true)
        await dispatch(proposalIdea({ ideaID: approveData.ideaID, proposal }))
        proposalLabelRef.current?.click()
        setLoading(false)
    }
    return (
        <div className="hero">
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                    <div className='w-full'>
                            <button className='btn btn-sm btn-primary float-right'><Link to="/createidea" className='w-fit'>New Idea</Link></button>
                        </div>
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

            {/* proposal modal */}
            <label htmlFor="proposalModal" className="btn hidden" ref={proposalLabelRef}>open modal</label>
            <input type="checkbox" id="proposalModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Wallet:</span>
                        </label>
                        <label className='w-8/12'>{approveData.wallet}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Budget:</span>
                        </label>
                        <label className='w-8/12'>{approveData.budget}</label>
                    </div>
                    <div className='flex items-start pb-2'>
                        <label className="w-4/12">
                            <span className="label-text font-bold">Milestone:</span>
                        </label>
                        <div className='w-8/12'>
                            {approveData.milestone.map((item: any, index: number) => (
                                <div key={index}>
                                    <label className='font-bold flex'>Milestone {index+1}:</label> 
                                    <p><label className='font-medium'>title: </label><label className='mr-3'>{item.title}</label></p>
                                    <label className='font-medium'>date: </label><label className='mr-3'>{item.date?.substring(0, 10)}</label>
                                    <label className='font-medium'>amount: </label> <label>{item.amount}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-start pb-2 pt-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Proposal:</span>
                        </label>
                        <textarea className="textarea textarea-bordered w-8/12" value={proposal} placeholder="Proposal" onChange={(e) => onChangeProposal(e)}></textarea>
                    </div>
                    <div className="modal-action">
                        <label className={`btn ${loading ? 'loading' : ''}`} onClick={() => onProposalSubmit()}>Submit</label>
                        <label htmlFor="proposalModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* proposal modal */}
        </div>
    )
}