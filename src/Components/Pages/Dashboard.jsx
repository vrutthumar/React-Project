
import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { RiChatFollowUpLine } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { PolarArea, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { HOC } from '../DashBoard/HOC';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data1 = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data2 = {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
        },
    ],
};

export const data3 = {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const Dashboard = () => {

    return (
        <>
            <section className='container-fluid mt-5'>
                <div className='row'>
                    <div className='home-section d-flex justify-content-between mt-5'>
                        <div className='home-con con-one'>
                            <div className='d-flex justify-content-between'>
                                <div className='me-3'>
                                    <h6>Order Rechived</h6>
                                    <div><FiShoppingCart /></div>
                                    <p>Complited Order</p>
                                </div>
                                <div className='mt-3'>
                                    <h4>486</h4>
                                    <p>793</p>
                                </div>
                            </div>
                        </div>
                        <div className='home-con con-two'>
                            <div className='d-flex justify-content-between'>
                                <div className='me-3'>
                                    <h6>Total Followers</h6>
                                    <div><RiChatFollowUpLine /></div>
                                    <p>My Followers</p>
                                </div>
                                <div className='mt-3'>
                                    <h4>1641</h4>
                                    <p>253</p>
                                </div>
                            </div>
                        </div>
                        <div className='home-con con-three'>
                            <div className='d-flex justify-content-between'>
                                <div className='me-3'>
                                    <h6>Order Rechived</h6>
                                    <div><BiTransfer /></div>
                                    <p>Complited Order</p>
                                </div>
                                <div className='mt-3'>
                                    <h4>486</h4>
                                    <p>793</p>
                                </div>
                            </div>
                        </div>
                        <div className='home-con con-four'>
                            <div className='d-flex justify-content-between'>
                                <div className='me-3'>
                                    <h6>Order Rechived</h6>
                                    <div><FaRegLightbulb /></div>
                                    <p>Complited Order</p>
                                </div>
                                <div className='mt-3'>
                                    <h4>486</h4>
                                    <p>793</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container-fluid'>
                <div className='row'>
                    <div className='chart-section d-flex justify-content-between mt-5'>
                        <div className='chart-con text-center mb-4 pb-3 me-1'>
                            <Pie data={data1} />
                        </div>
                        <div className='chart-con text-center mb-4 me-1'>
                            <PolarArea data={data2} />
                        </div>
                        <div className='chart-con text-center mb-4'>
                            <Doughnut data={data3} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HOC(Dashboard)
