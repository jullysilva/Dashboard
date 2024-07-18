export interface IData {
  Cliente: string;
  Servidor: "CURRENT" | "MIGRACAO";
  Status: 1 | 2;
  Etapa:
    | "INI"
    | "AUTOLOAD"
    | "PDIBASH"
    | "COMPLETO"
    | "CONCLUIDA"
    | "PROCESS_FULL"
    | "INTERFACES"
    | "DBROUTINES";
}
