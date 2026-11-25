import sap from "@/assets/erp/sap.svg";
import totvs from "@/assets/erp/totvs.svg";
import oracle from "@/assets/erp/oracle.svg";
import infor from "@/assets/erp/infor.svg";
import epicor from "@/assets/erp/epicor.png";
import sage from "@/assets/erp/sage.svg";
import odoo from "@/assets/erp/odoo.svg";
import sankhya from "@/assets/erp/sankhya.svg";
import senior from "@/assets/erp/senior.svg";
import omie from "@/assets/erp/omie.webp";
import bling from "@/assets/erp/bling.svg";
import contaazul from "@/assets/erp/contaazul.svg";

/** Logos dos ERPs de mercado (altura em px ajustada para todos parecerem do mesmo tamanho). */
export const erps: { name: string; src: string; h: number; word?: string }[] = [
  { name: "SAP", src: sap, h: 34 },
  { name: "TOTVS", src: totvs, h: 30, word: "TOTVS" },
  { name: "Oracle", src: oracle, h: 17 },
  { name: "Sankhya", src: sankhya, h: 26 },
  { name: "Senior", src: senior, h: 28 },
  { name: "Infor", src: infor, h: 32 },
  { name: "Omie", src: omie, h: 28 },
  { name: "Bling", src: bling, h: 30 },
  { name: "Epicor", src: epicor, h: 22 },
  { name: "Conta Azul", src: contaazul, h: 22 },
  { name: "Sage", src: sage, h: 34 },
  { name: "Odoo", src: odoo, h: 38 },
];
