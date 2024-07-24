import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import PopupDeleteOrder from './PopupDeleteOrder'; // Asegúrate de que la ruta sea correcta
import { tableStyles, getStatusClass, statusStyles, ordersCols } from '../../utils'; // Importar los estilos y columnas
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function OrdersTable({ orders }) {
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate(); // Hook para navegar

    const handleDeleteClick = (order) => {
        setSelectedOrder(order);
        setIsDeletePopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsDeletePopupOpen(false);
        setSelectedOrder(null);
        location.reload();
    };

    const handleEditClick = (orderId) => {
        navigate(`/add-order/${orderId}`);
    };

    return (
        <div className="overflow-x-auto">
            <table className={tableStyles.table} style={{ borderSpacing: '0 10px' }}>
                <thead>
                    <tr>
                        {ordersCols.map(col => (
                            <th key={col.key} scope="col" className={`${tableStyles.th} ${col.className || ''}`}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={tableStyles.tbody}>
                    {orders.map(order => (
                        <tr key={order.id} className={tableStyles.tr}>
                            <td className={`${tableStyles.tdLeft} ${tableStyles.iconCell}`}>{order.id}</td>
                            <td className={tableStyles.td}>{order.number}</td>
                            <td className={tableStyles.td}>{order.date}</td>
                            <td className={tableStyles.td}>{order.orderProducts.length}</td>
                            <td className={tableStyles.td}>{order.total}</td>
                            <td className={tableStyles.td}>
                                <span className={`${getStatusClass(order.status)} ${statusStyles.base} ${statusStyles.rounded} ${statusStyles.sizeLimit}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className={`${tableStyles.tdRight} ${tableStyles.iconCell}`}>
                                <div className={tableStyles.tdOptions} style={{ justifyContent: 'flex-end' }}>
                                    {order.status !== 'Completed' && (
                                        <FaEdit
                                            className="text-black cursor-pointer"
                                            onClick={() => handleEditClick(order.id)}
                                        />
                                    )}
                                    <FaTrash
                                        className="text-black cursor-pointer"
                                        onClick={() => handleDeleteClick(order)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDeletePopupOpen && selectedOrder && (
                <PopupDeleteOrder
                    order={selectedOrder}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}
