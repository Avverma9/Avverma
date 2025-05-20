import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDefaultCoupon } from '../../redux/reducers/profileSlice';


export default function Coupon() {
    const dispatch = useDispatch()
    const coupon  = useSelector((state) => state.profile.coupon);

    useEffect(() => {
        dispatch(fetchDefaultCoupon()).unwrap();
    }, [dispatch]);

    if (location.pathname !== '/coupons') {
        return null
    }
    
    console.log(coupon, "coupon")
    return (
        <div>
            <p>Here is coupon {coupon?.findData?.map((item,index)=>{
                return (
                    <div key={index}>
                        <h1>{item.couponCode}</h1>
                        {/* <p>{item.couponDescription}</p>
                        <p>{item.couponDiscount}</p> */}
                    </div>
                )
            })}</p>
        </div>
    )
}
