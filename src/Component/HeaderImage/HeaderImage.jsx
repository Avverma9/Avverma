/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './HeaderImage.css'

const HeaderImage = () => {
    const location=useLocation()
if(location.pathname !== "/"){
    return null
}
  return (
    <div className="header">
      <p className='city-names'>Top Offers</p>
      <img className="circle" src="https://static.guim.co.uk/sys-images/Guardian/Pix/red/blue_pics/2009/04/14/pasta460.gif" alt="Image 1" />
      
      <img className="circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Biswa_Bangla_Gate_in_Kolkata_01.jpg/1200px-Biswa_Bangla_Gate_in_Kolkata_01.jpg" alt="Image 2" />
      <p className='city-name'>Kolkata</p>
      
      <img className="circle" src="https://www.nationsonline.org/gallery/India/Gateway-of-India.jpg" alt="Image 3" />
      <p className='city-name'>Mumbai</p>
      <img className="circle" src="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/68000/68002-New-Delhi.jpg" alt="Image 4" />
      <p className='city-name'>Delhi</p>
      <img className="circle" src="https://images.squarespace-cdn.com/content/v1/5a3bb03b4c326d76de73ddaa/1669616058232-6GMLSJ3V1GLQD18BA88I/The+Common+Wanderer-2155-2+%281%29.jpg?format=1000w" alt="Image 1" />
      <p className='city-name'>Jaipur</p>
      <img className="circle" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=700&h=500&s=1" alt="Image 2" />
      <p className='city-name'>Goa</p>
      <img className="circle" src="https://www.incredibleindiatour.net/packages/img/akshardham-temple.jpg" alt="Image 3" />
      <p className='city-name'>Gujrat</p>
      <img className="circle" src="https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/golghar/3300X2400.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg" alt="Image 4" />
      <p className='city-name'>Patna</p>
     
      <img className="circle" src="https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2014/02/Taj-Mahal-e1553857594808.jpg" alt="Image 3" />
      <p className='city-name'>Agra</p>
      <img className="circle" src="https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2018/12/varanasi-city.png" alt="Image 4" />
      <p className='city-name'>Varanasi</p>
      <img className="circle" src="https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/07/Jaisalmer-Fort1-Rajasthan.jpg" alt="Image 3" />
      <p className='city-name'>Jaisalmer</p>
      <img className="circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Neeulm_Valley_AJK_%28Arang_Kel%29.jpg/640px-Neeulm_Valley_AJK_%28Arang_Kel%29.jpg" alt="Image 4" />
      <p className='city-name'>Kashmir</p>
    </div>
  );
};

export default HeaderImage;
