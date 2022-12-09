package mhmd.pzsp.PZSPApp.exceptions;

public class BackendException extends Exception {
    // pzsp2 trochę niefortunna nazwa, chyba
    // pzsp2 więcej errorów, aplikacja wytrzyma
    public BackendException(String s) {
        super(s);
    }
}
