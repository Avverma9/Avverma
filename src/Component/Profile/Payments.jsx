import { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillCreditCardFill } from "react-icons/bs";



export const Payments = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  
  return (
    <>
      <div
        className="sideBar_options_section"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <BsFillCreditCardFill className="svg_logo" />
        <h2>Payments</h2>
      </div>
      <div className="sideBar_options_section_collapse" {...getCollapseProps()}>
        <button>
          <p>Gift Cards</p>
        </button>
        <button>
          <p>Saved Upi</p>
        </button>
        <button>
          <p>Saved Cards</p>
        </button>
      </div>
      <div className="_underLine" />
    </>
  );
}
