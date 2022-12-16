import React, {useEffect, useRef, useState} from 'react'
import DataTable from 'react-data-table-component'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getIdeas, proposeIdea } from '../../redux/idea/actions'
import parser from 'html-react-parser'
import { CustomLoader } from '../../components/CustomLoader'
import { categories } from '../../constants'

interface IProposedIdeaProps {}

export const ProposedIdea:React.FC<IProposedIdeaProps> = () => {
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
                    <button className='btn btn-xs' onClick={() => onAssignModalBtn(row._id, row.proposals)}>View Proposal</button>
                </div>
            ),
            width: '20%'
        },
    ];

    const proposal_columns = [
        {
            name: 'Name',
            selector: (row: any) => row.user.name,
            sortable: true,
        },
        {
            name: 'Github',
            selector: (row: any) => row.user.github,
            sortable: true,
        },
        {
            name: 'Proposal',
            selector: (row: any) => row.proposal,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row: any) => (
                <div className='flex'>
                    <button className='btn btn-xs' onClick={() => onProposalModalBtn(row.user._id, row.proposal)}>Assign</button>
                </div>
            ),
            width: '150px'
        },
    ];

    const dispatch: Dispatch<any> = useDispatch()
    const assignLabelRef = useRef<HTMLLabelElement>(null)
    const proposalLabelRef = useRef<HTMLLabelElement>(null)
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(true)
    const [proposalData, setProposalData] = useState([])
    const [tempProposalData, setTempProposalData] = useState({
        ideaId: '',
        userId: '',
        proposal: ''
    })
    const ideas = useSelector((state: any) => state.idea.approved_ideas)

    const onAssignModalBtn = (ideaId: string, proposals: any) => {
        setProposalData(proposals)
        setTempProposalData({ ...tempProposalData, ideaId })
        assignLabelRef.current?.click()
    }
    const onProposalModalBtn = (userId: string, proposal: string) => {
        setTempProposalData({
            ...tempProposalData,
            userId,
            proposal
        })
        proposalLabelRef.current?.click()
    }
    useEffect(() => {
        async function fetchData() {
            await dispatch(getIdeas({ type: 'approved' }))
            setPending(false)
        }
        fetchData()
    }, [])
    const onAssignSubmit = async () => {
        setLoading(true)
        await dispatch(proposeIdea({ ideaId: tempProposalData.ideaId, userId: tempProposalData.userId }))
        setLoading(false)
        proposalLabelRef.current?.click()
        assignLabelRef.current?.click()
    }
    return (
        <div className='hero'>
            <div className="hero-content xl:w-4/5 md:w-4/5 sm:w-full">
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

            {/* assign modal */}
            <label htmlFor="assignModal" className="btn hidden" ref={assignLabelRef}>open modal</label>
            <input type="checkbox" id="assignModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-8/12 max-w-5xl">
                    <label className='label font-medium'>Proposals</label>
                    <div className='w-12/12'>
                        <DataTable
                            columns={proposal_columns}
                            data={proposalData} 
                            pagination 
                            highlightOnHover={true} 
                            progressPending={pending}
                            progressComponent={<CustomLoader />}
                            responsive={true} 
                            striped={true}
                        />
                    </div>
                    <div className="modal-action">
                        <label htmlFor="assignModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* assign modal */}

            {/* proposal modal */}
            <label htmlFor="proposalModal" className="btn hidden" ref={proposalLabelRef}>open modal</label>
            <input type="checkbox" id="proposalModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className='flex items-start pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Proposal:</span>
                        </label>
                        <label className='w-8/12'>{tempProposalData.proposal}</label>
                    </div>
                    <div className="modal-action">
                        <label className={`btn ${loading ? 'loading' : ''}`} onClick={() => onAssignSubmit()}>Assign</label>
                        <label htmlFor="proposalModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* proposal modal */}
        </div>
    )
}