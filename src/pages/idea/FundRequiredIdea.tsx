import React, {useEffect, useState, useRef} from 'react'
import DataTable from 'react-data-table-component'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getBalance, getIdeas, inprogressIdea } from '../../redux/idea/actions'
import { CustomLoader } from '../../components/CustomLoader'
import parser from 'html-react-parser'
import { categories } from '../../constants'

interface IFundRequiredIdeaProps {}

export const FundRequiredIdea:React.FC<IFundRequiredIdeaProps> = () => {
    const columns = [
        {
            name: 'Assigned user',
            selector: (row: any) => row.assigned_user.name,
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
            name: 'Title',
            selector: (row: any) => row.title,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Content',
            selector: (row: any) => parser(row.content.slice(0, 20).concat('...')),
            sortable: true,
            width: "15%"
        },
        {
            name: 'Budget',
            selector: (row: any) => row.budget,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Fund amount',
            selector: (row: any) => row.fundAmount,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Percent',
            cell: (row: any) => (
                <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": ((row.fundAmount / row.budget) * 100).toFixed(1), "--size": "2rem", fontSize: '10px' }}>
                    {((row.fundAmount / row.budget) * 100).toFixed(1)}%
                </div>
            ),
            width: "10%"
        },
        {
            name: 'Action',
            button: true,
            cell: (row: any) => (
                <div className='flex'>
                    <button className='btn btn-xs mr-1' onClick={() => onMoreModal(row)}>more</button>
                    {role === '1' && (<button className='btn btn-xs mr-1' onClick={() => onInprogressModal(row._id)}>Inprogress</button>)}
                </div>
            ),
            width: "20%"
        },
    ];

    const dispatch: Dispatch<any> = useDispatch()
    const moreLabelRef = useRef<HTMLLabelElement>(null)
    const inprogressLabelRef = useRef<HTMLLabelElement>(null)
    const ideas = useSelector((state: any) => state.idea.fundrequired_ideas)
    const [ideasWithFund, setIdeasWithFund] = useState([])
    const fund_amount = useSelector((state: any) => state.idea.fund_amount)
    const { role } = useSelector((state: any) => state.auth.user)
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(true)
    const [formData, setFormData] = useState({
        ideaId: '',
        name: '',
        github: '',
        title: '',
        content: '',
        budget: '',
        wallet: ''
    })
    const onMoreModal = async (row: any) => {
        setFormData({
            ...formData,
            name: row.assigned_user.name,
            github: row.assigned_user.github,
            title: row.title,
            content: row.content,
            budget: row.budget,
            wallet: row.wallet
        })
        moreLabelRef.current?.click()
        await dispatch(getBalance({ wallet: row.wallet }))
    }
    const onInprogressModal = (ideaId: string) => {
        setFormData({  ...formData, ideaId})
        inprogressLabelRef.current?.click()
    }

    useEffect(() => {
        async function fetchData() {
            const res: any = await dispatch(getIdeas({ type: 'fundrequired' }))
            var data:any = []
            res.forEach(async (item: any, index: number) => {
                var json = {fundAmount: ''}
                json = item
                const balance:any = await dispatch(getBalance({ wallet: item.wallet }))
                json.fundAmount = balance
                data.push(json)
            })
            setIdeasWithFund(data)
            setPending(false)
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     async function fetchData() {
    //         var data:any = []
    //         ideas.forEach(async (item: any, index: number) => {
    //             var json = {fundAmount: ''}
    //             json = item
    //             const balance:any = await dispatch(getBalance({ wallet: item.wallet }))
    //             json.fundAmount = balance
    //             data.push(json)
    //         })
    //         setIdeasWithFund(data)
    //         setPending(false)
    //     }
    //     fetchData()
    // }, [ideas])

    const onInprogressSubmit = async () => {
        setLoading(true)
        await dispatch(inprogressIdea({ ideaId: formData.ideaId }))
        inprogressLabelRef.current?.click()
        setLoading(false)
    }

    return (
        <div className='hero'>
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
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Wallet:</span>
                        </label>
                        <label className='w-8/12'>{formData.wallet}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Budget:</span>
                        </label>
                        <label className='w-8/12'>{formData.budget}</label>
                    </div>
                    <div className='flex items-center pb-2'>
                        <label className="label w-4/12">
                            <span className="label-text font-bold">Fund amount:</span>
                        </label>
                        <label className='w-8/12'>{fund_amount}</label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="moreInfoModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* more info modal */}

            {/* inprogress modal */}
            <label htmlFor="inprogressModal" className="btn hidden" ref={inprogressLabelRef}>open modal</label>
            <input type="checkbox" id="inprogressModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    
                    <div className='flex items-center pb-2'>
                        <label className="label w-12/12">
                            <span className="label-text font-bold text-xl">Are you going to move this idea to the Inprogress step?</span>
                        </label>
                    </div>
                    <div className="modal-action">
                        <label className={`btn ${loading ? 'loading' : ''}`} onClick={() => onInprogressSubmit()}>Yes</label>
                        <label htmlFor="inprogressModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* inprogress modal */}
        </div>
    )
}