package mhmd.pzsp.PZSPApp.security;

public enum Roles {
    ADMIN("admin"),
    USER("user");

    Roles(String name) {
        this.name = name;
    }
    private final String name;

    @Override
    public String toString() {
        return name;
    }
}
