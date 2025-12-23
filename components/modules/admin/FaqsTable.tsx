'use client'

import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
// import { db } from "@/services/firebase/serviciosFaqs";

import TableCell from "./TableCell";
import TableHeaderCell from "./TableHeaderCell";
import ActionButtonsCell from "./ActionButtonsCell";

import { FaqItem } from "@/interfaces/Faqs";
import { FaqList } from "@/utils/faqsListData";

const FaqsTable = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(FaqList)

  useEffect(() => {
    // const q = query(collection(db, "faqs"))
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const faqsData = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setFaqs(faqsData as unknown as FaqItem[])
    // });
    // return () => unsubscribe()
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Pregunta</TableHeaderCell>
            <TableHeaderCell>Respuesta</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-500">#{faq.id}</TableCell>
              <TableCell className="font-medium text-gray-900">{faq.question}</TableCell>
              <TableCell className="font-medium text-gray-900">{faq.answer}</TableCell>
              <ActionButtonsCell />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FaqsTable;