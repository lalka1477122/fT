// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TopBarLogo } from "./TopBarLogo";
import { formatDate } from "./formatDate";
import QRCode from "qrcode"; // Импортируем библиотеку QRCode
import "./CreatePDF.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Подключаем встроенные шрифты

export const CreatePDF = () => {
    function Наименование_перевозчика(transportType) {
        if (transportType === 'Троллейбус') {
            return 'МП г. Омска Электрический транспорт';
        } else {
            return '';
        }
    }

    // Состояния для номера автобуса и вида транспорта
    const [busNumber, setBusNumber] = useState("");
    const [transportType, setTransportType] = useState("");

    const generatePDF = async () => {
        // Генерация QR-кода
        const qrCodeDataURL = await QRCode.toDataURL('Ваше сообщение или ссылка'); // Генерируем DataURL QR-кода

        // Определяем содержимое PDF
        const docDefinition = {
            content: [
                { text: `${formatDate(new Date())}`, fontSize: 12, margin: [0, 0, 0, 50] },

                // 1 Вид билета
                { text: "Вид билета", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: "Разовый билет QRPay (Акция)", fontSize: 12, margin: [0, 0, 0, 30] },

                // 2 Серия билета
                { text: "Серия билета", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: "QR201375000434", fontSize: 12, margin: [0, 0, 0, 30] },

                // 3 Номер билета
                { text: "Номер билета", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: "2024091810012500", fontSize: 12, margin: [0, 0, 0, 30] },

                // 4 Наименование перевозчика
                { text: "Наименование перевозчика", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: `${Наименование_перевозчика(transportType)}`, fontSize: 12, margin: [0, 0, 0, 30] },

                // 5 ИНН перевозчика
                { text: "ИНН перевозчика", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: "5507022628", fontSize: 12, margin: [0, 0, 0, 30] },

                // 6 Вид транспорта
                { text: "Вид транспорта", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: `${transportType}`, fontSize: 12, margin: [0, 0, 0, 30] },

                // 7 Маршрут/Станция
                { text: "Маршрут/Станция", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: `${busNumber}`, fontSize: 12, margin: [0, 0, 0, 30] },

                // 8 Стоимость
                { text: "Стоимость", fontSize: 12, margin: [0, 0, 0, 3], color: [0, 0, 0, 40] },
                { text: "27.00 руб", fontSize: 12, margin: [0, 0, 0, 30] },

                // QR-код
                { image: qrCodeDataURL, width: 500, height: 200, margin: [0, 0, 0, 30] }, // Добавляем QR-код в PDF
            ],
            defaultStyle: {
                font: "Roboto", // Используем встроенный шрифт Roboto, который поддерживает кириллицу
            },
        };

        // Создаем и загружаем PDF
        pdfMake.createPdf(docDefinition).download(`ticket_${formatDate(new Date())}.pdf`);
    };

    return (
        <>
            <TopBarLogo />
            <div className="form-container">
    <label htmlFor="Number_Avtobus">Номер автобуса</label>
    <label htmlFor="pick_number_bus">Выберите маршрут</label>
    <p></p>
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
                Оплатить 27 руб
            </button>
</div>

        </>
    );
};
