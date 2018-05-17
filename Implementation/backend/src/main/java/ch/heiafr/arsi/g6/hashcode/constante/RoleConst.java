package ch.heiafr.arsi.g6.hashcode.constante;

import ch.heiafr.arsi.g6.hashcode.model.Role;

public abstract class RoleConst {
    public static final Role ADMIN = new Role(1,"ROLE_ADMIN");
    public static final Role VALIDATED_ORGANIZER = new Role(2,"ROLE_VALIDATED_ORGANIZER");
    public static final Role PENDING_ORGANIZER = new Role(3,"ROLE_PENDING_ORGANIZER");
    public static final Role VALIDATED_USER = new Role(4,"ROLE_VALIDATED_USER");
    public static final Role WAITING_USER = new Role(5,"ROLE_WAITING_USER");
}