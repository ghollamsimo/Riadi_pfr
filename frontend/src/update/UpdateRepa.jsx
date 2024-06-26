import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import {useEffect, useState} from "react";
import { UpdateRepas } from "../redux/Action.js";
import { fetchRepas } from "../redux/actions/RepaAction.jsx";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Aos from "aos";

const UpdateRepa = ({ setOpenModal, item, updateRepa  , repas}) => {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    const [name, setName] = useState(item.name);
    const navigate = useNavigate();

    const validate = () => {
        if (!name) {
            toast.error("Please fill in the fields");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await updateRepa(item, { name });
                toast.success("Repa updated successfully");
                setOpenModal(false);
                repas()
            } catch (error) {
                toast.error("Failed to update repa");
                console.error("Error updating repa:", error);
            }
        }
    };

    return (
        <>
            <div className="fixed inset-0 overflow-y-auto flex justify-center items-center" data-aos="fade-up">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                    <div className='flex justify-end'>
                        <button onClick={() => setOpenModal(false)} className="text-xl">
                            <IoClose/>
                        </button>
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Update Repa</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border outline-0 p-2 rounded"
                                placeholder="Repa name"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateRepa: (id, data) => dispatch(UpdateRepas(id, data)),
        repas: () => dispatch(fetchRepas()),
        loader: () => dispatch(fetchRepas())
    };
};

export default connect(null, mapDispatchToProps)(UpdateRepa);
