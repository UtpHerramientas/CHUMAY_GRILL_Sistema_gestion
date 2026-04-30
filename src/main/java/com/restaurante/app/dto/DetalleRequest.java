package com.restaurante.app.dto;

import lombok.Data;

@Data
public class DetalleRequest {
    private Integer productoId;
    private Integer cantidad;
}
