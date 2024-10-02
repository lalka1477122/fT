import React, { useState } from "react";
import { TopBarLogo } from "./TopBarLogo";
import { formatDate } from "./formatDate";
import { Page, Text, Document, PDFDownloadLink, StyleSheet, Font } from '@react-pdf/renderer';
import "./CreatePDF.css";

// Подключаем шрифт Roboto для поддержки кириллицы
Font.register({
    family: 'Roboto',
    src: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Roboto',
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 3,
    },
    value: {
        fontSize: 12,
        marginBottom: 30,
    },
});

const getCarrierName = (type) => {
    const carriers = {
        'Троллейбус': 'МП г. Омска Электрический транспорт',
        'Автобус': 'МП г. Омска Автобусный транспорт',
    };
    return carriers[type] || '';
};

const TicketPDF = ({ busNumber, transportType }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.section}>{formatDate(new Date())}</Text>
            {createTextBlock("Вид билета", "Разовый билет QRPay (Акция")}
            {createTextBlock("Серия билета", "QR201375000434")}
            {createTextBlock("Номер билета", "2024091810012500")}
            {createTextBlock("Наименование перевозчика", getCarrierName(transportType))}
            {createTextBlock("ИНН перевозчика", "5507022628")}
            {createTextBlock("Вид транспорта", transportType)}
            {createTextBlock("Маршрут/Станция", busNumber)}
            {createTextBlock("Номер ТС", "22")}
            {createTextBlock("Стоимость", "35.00 руб")}
        </Page>
    </Document>
);

function createTextBlock(label, value) {
    return (
        <React.Fragment>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </React.Fragment>
    );
}

export const CreatePDF = () => {
    const [busNumber, setBusNumber] = useState("");
    const [transportType, setTransportType] = useState("");

    return (
        <>
            <TopBarLogo />
            <div className="form-container">
                <label>Номер автобуса</label>
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

                {busNumber && transportType && (
                    <PDFDownloadLink
                        document={<TicketPDF busNumber={busNumber} transportType={transportType} />}
                        fileName={`ticket_${formatDate(new Date())}.pdf`}
                        className="Btn_buy"
                    >
                        {({ loading }) => (loading ? "Создание PDF..." : "Оплатить 35 руб")}
                    </PDFDownloadLink>
                )}
            </div>
        </>
    );
};
