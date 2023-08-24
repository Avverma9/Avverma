import React from 'react';
import { CiStar } from 'react-icons/ci';
import './Ratingrange.css';

const Ratingrange = () => {
    return (
        <div className='whole-divdiv'>
            <div className='left-cont-value'>
                <div className='rating-nom'>
                    <span className='rat-nu'>4
                        <span className='star-icnn'><CiStar /></span>
                    </span>

                </div>
                <h4 className='condition'>Good</h4>
                <h5 className='rating-no'>342 ratings</h5>
            </div>
            <div className='rating-range'>
                <div className='rating_1stslide'>
                    <div className='rating-left'>
                        <div className='rating-no'>5</div>
                        <span className='star-icn'><CiStar /></span>
                        <span className='range-con'>
                            <span className='total-rng5'></span>
                        </span>
                    </div>
                    <div className='rating-right'>43%</div>
                </div>
                <div className='rating_1stslide'>
                    <div className='rating-left'>
                        <div className='rating-no'>4</div>
                        <span className='star-icn'><CiStar /></span>
                        <span className='range-con'>
                            <span className='total-rng4'></span>
                        </span>
                    </div>
                    <div className='rating-right'>9%</div>
                </div>
                <div className='rating_1stslide'>
                    <div className='rating-left'>
                        <div className='rating-no'>3</div>
                        <span className='star-icn'><CiStar /></span>
                        <span className='range-con'>
                            <span className='total-rng3'></span>
                        </span>
                    </div>
                    <div className='rating-right'>27%</div>
                </div>
                <div className='rating_1stslide'>
                    <div className='rating-left'>
                        <div className='rating-no'>2</div>
                        <span className='star-icn'><CiStar /></span>
                        <span className='range-con'>
                            <span className='total-rng2'></span>
                        </span>
                    </div>
                    <div className='rating-right'>35%</div>
                </div>
                <div className='rating_1stslide'>
                    <div className='rating-left'>
                        <div className='rating-no'>1</div>
                        <span className='star-icn'><CiStar /></span>
                        <span className='range-con'>
                            <span className='total-rng1'></span>
                        </span>
                    </div>
                    <div className='rating-right'>70%</div>
                </div>

            </div>
        </div>
    )
}

export default Ratingrange
