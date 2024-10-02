// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TopBarLogo } from "./TopBarLogo";
import { formatDate } from "./formatDate";
import "./CreatePDF.css";


pdfMake.vfs = pdfFonts.pdfMake.vfs; // Подключаем встроенные шрифты

export const CreatePDF = () => {
    const [busNumber, setBusNumber] = useState("");
    const [transportType, setTransportType] = useState("");

    const getCarrierName = (type) => {
        const carriers = {
            'Троллейбус': 'МП г. Омска Электрический транспорт',
            'Автобус': 'МП г. Омска Автобусный транспорт',
        };
        return carriers[type] || '';
    };

    const generatePDF = () => {
        if (!busNumber || !transportType) {
            alert("Пожалуйста, выберите номер автобуса и вид транспорта.");
            return;
        }

        var docDefinition = {
            content: [
                { text: formatDate(new Date()), fontSize: 12, margin: [0, 0, 0, 50] },
                createTextBlock("Вид билета", "Разовый билет QRPay (Акция"),
                createTextBlock("Серия билета", "QR201375000434"),
                createTextBlock("Номер билета", "2024091810012500"),
                createTextBlock("Наименование перевозчика", getCarrierName(transportType)),
                createTextBlock("ИНН перевозчика", "5507022628"),
                createTextBlock("Вид транспорта", transportType),
                createTextBlock("Маршрут/Станция", busNumber),
                createTextBlock("номер ТС", "22"),
                createTextBlock("Стоимость", "35.00 руб"),
            ],
            defaultStyle: {
                font: "Roboto", // Используем встроенный шрифт Roboto
            },
        };

        pdfMake.createPdf(docDefinition).download(`ticket_${formatDate(new Date())}.pdf`);
    };

    function createTextBlock(label, value) {
        return [
            { text: label, fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
            { text: value, fontSize: 12, margin: [0, 0, 0, 30] },
        ];
    };

    return (
        <>
            <TopBarLogo />
            <div className="form-container">
                <label>Номер автобуса</label>
                <label>Выберите маршрут</label>
                <select
                    id="pick_number_bus"
                    className="select-field"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                >
                    <option value="">Выберите авто:</option>
                    <option value="2">2</option>
                    <option value="69">69</option>
                    <option value="16">16</option>
                    <option value="33">33</option>
                </select>

                <label htmlFor="pick_vid_bus">Вид транспорта</label>
                <select
                    id="pick_vid_bus"
                    className="select-field"
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value)}
                >
                    <option value="">Выберите вид транспорта</option>
                    <option value="Троллейбус">Троллейбус</option>
                    <option value="Автобус">Автобус</option>
                </select>

                <button className="Btn_buy" onClick={generatePDF}>
                    Оплатить 35 руб
                </button>
            </div>
        </>
    );
};
