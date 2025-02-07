declare module 'html2pdf.js' {
  export interface Options {
    margin?: number;
    filename?: string;
    enableLinks?: boolean;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      logging?: boolean;
      allowTaint?: boolean;
      foreignObjectRendering?: boolean;
      letterRendering?: boolean;
      removeContainer?: boolean;
      scrollX?: number;
      scrollY?: number;
      windowWidth?: number;
      windowHeight?: number;
      x?: number;
      y?: number;
      width?: number;
      height?: number;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: 'portrait' | 'landscape';
      putTotalPages?: boolean;
      compress?: boolean;
      precision?: number;
      userUnit?: number;
      hotfixes?: string[];
      encryption?: {
        userPassword?: string;
        ownerPassword?: string;
        userPermissions?: string[];
      };
    };
  }

  export interface Html2PdfStatic {
    (): Html2PdfStatic;
    set(options: Options): Html2PdfStatic;
    from(element: HTMLElement): Html2PdfStatic;
    outputPdf(): any;
    save(): Promise<void>;
  }

  const html2pdf: Html2PdfStatic;
  export default html2pdf;
} 