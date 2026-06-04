package com.restaurante.app.service;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.*;
import com.restaurante.app.model.DetallePedido;
import com.restaurante.app.model.Venta;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class BoletaPdfService {

    public ByteArrayInputStream generarBoletaPdf(Venta venta) {
        Document document = new Document(PageSize.A6, 15, 15, 15, 15); // A6 format for ticket-style look
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Font configurations
            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.DARK_GRAY);
            Font fontSubtitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8, Color.GRAY);
            Font fontRegularBold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8, Color.BLACK);
            Font fontRegular = FontFactory.getFont(FontFactory.HELVETICA, 7, Color.BLACK);
            Font fontSmall = FontFactory.getFont(FontFactory.HELVETICA, 6, Color.DARK_GRAY);

            // Restaurant Title
            Paragraph title = new Paragraph("CHUMAY CHIFA PARRILLAS", fontTitle);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(2);
            document.add(title);

            Paragraph subtitle = new Paragraph("Chiclayo - Perú\nTeléfono: 974859600", fontSubtitle);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(10);
            document.add(subtitle);

            // Invoice details (Boleta / Factura)
            String tipoComprobante = venta.getComprobante() != null ? venta.getComprobante().toUpperCase() : "TICKET";
            String nroComprobante = "";
            if (venta.getSerie() != null && !venta.getSerie().isEmpty() && venta.getCorrelativo() != null && !venta.getCorrelativo().isEmpty()) {
                nroComprobante = venta.getSerie() + "-" + venta.getCorrelativo();
            } else {
                nroComprobante = String.format("TK-%06d", venta.getId());
            }

            Paragraph compInfo = new Paragraph(tipoComprobante + " Nro: " + nroComprobante, fontRegularBold);
            compInfo.setAlignment(Element.ALIGN_CENTER);
            compInfo.setSpacingAfter(10);
            document.add(compInfo);

            // Customer details
            Paragraph clientInfo = new Paragraph();
            clientInfo.setFont(fontRegular);
            clientInfo.add("Fecha: " + venta.getFechaVenta().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")) + "\n");
            
            String cliente = "Cliente General";
            if (venta.getPedido() != null) {
                if (venta.getPedido().getNombreCliente() != null && !venta.getPedido().getNombreCliente().isEmpty()) {
                    cliente = venta.getPedido().getNombreCliente();
                } else if (venta.getPedido().getMesa() != null) {
                    cliente = "Mesa " + venta.getPedido().getMesa().getNumero();
                }
            }
            clientInfo.add("Cliente: " + cliente + "\n");
            
            if (venta.getPedido() != null && venta.getPedido().getTelefonoCliente() != null && !venta.getPedido().getTelefonoCliente().isEmpty()) {
                clientInfo.add("Teléfono: " + venta.getPedido().getTelefonoCliente() + "\n");
            }
            
            if (venta.getCajero() != null) {
                clientInfo.add("Cajero: " + venta.getCajero().getNombre() + "\n");
            }
            
            clientInfo.setSpacingAfter(10);
            document.add(clientInfo);

            // Divider
            Paragraph divider = new Paragraph("----------------------------------------------------------------------", fontSmall);
            divider.setAlignment(Element.ALIGN_CENTER);
            divider.setSpacingAfter(5);
            document.add(divider);

            // Order items Table
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{1.5f, 5f, 2f});

            // Headers
            PdfPCell cell;
            cell = new PdfPCell(new Phrase("Cant", fontRegularBold));
            cell.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("Descripción", fontRegularBold));
            cell.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase("Subtotal", fontRegularBold));
            cell.setBorder(Rectangle.NO_BORDER);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);

            if (venta.getPedido() != null && venta.getPedido().getDetalles() != null) {
                for (DetallePedido det : venta.getPedido().getDetalles()) {
                    cell = new PdfPCell(new Phrase(det.getCantidad().toString(), fontRegular));
                    cell.setBorder(Rectangle.NO_BORDER);
                    table.addCell(cell);

                    String prodNombre = det.getProducto() != null ? det.getProducto().getNombre() : "Plato";
                    cell = new PdfPCell(new Phrase(prodNombre, fontRegular));
                    cell.setBorder(Rectangle.NO_BORDER);
                    table.addCell(cell);

                    java.math.BigDecimal sub = det.getSubtotal();
                    cell = new PdfPCell(new Phrase("S/ " + String.format("%.2f", sub), fontRegular));
                    cell.setBorder(Rectangle.NO_BORDER);
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(cell);
                }
            }

            document.add(table);
            document.add(divider);

            // Summary details
            PdfPTable tableSummary = new PdfPTable(2);
            tableSummary.setWidthPercentage(100);
            tableSummary.setWidths(new float[]{6f, 4f});

            cell = new PdfPCell(new Phrase("TOTAL:", fontRegularBold));
            cell.setBorder(Rectangle.NO_BORDER);
            tableSummary.addCell(cell);

            cell = new PdfPCell(new Phrase("S/ " + String.format("%.2f", venta.getTotal()), fontRegularBold));
            cell.setBorder(Rectangle.NO_BORDER);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            tableSummary.addCell(cell);

            cell = new PdfPCell(new Phrase("Método Pago:", fontRegular));
            cell.setBorder(Rectangle.NO_BORDER);
            tableSummary.addCell(cell);

            cell = new PdfPCell(new Phrase(venta.getMetodoPago(), fontRegular));
            cell.setBorder(Rectangle.NO_BORDER);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            tableSummary.addCell(cell);

            if (venta.getMontoRecibido() != null) {
                cell = new PdfPCell(new Phrase("Recibido:", fontRegular));
                cell.setBorder(Rectangle.NO_BORDER);
                tableSummary.addCell(cell);

                cell = new PdfPCell(new Phrase("S/ " + String.format("%.2f", venta.getMontoRecibido()), fontRegular));
                cell.setBorder(Rectangle.NO_BORDER);
                cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                tableSummary.addCell(cell);

                cell = new PdfPCell(new Phrase("Vuelto:", fontRegular));
                cell.setBorder(Rectangle.NO_BORDER);
                tableSummary.addCell(cell);

                cell = new PdfPCell(new Phrase("S/ " + String.format("%.2f", venta.getVuelto()), fontRegular));
                cell.setBorder(Rectangle.NO_BORDER);
                cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                tableSummary.addCell(cell);
            }

            document.add(tableSummary);
            document.add(divider);

            Paragraph footer = new Paragraph("¡Gracias por su preferencia!\nVuelva pronto", fontSubtitle);
            footer.setAlignment(Element.ALIGN_CENTER);
            footer.setSpacingBefore(10);
            document.add(footer);

            document.close();

        } catch (DocumentException ex) {
            ex.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
