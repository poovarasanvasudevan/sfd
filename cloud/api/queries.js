module.exports = {
    LDAP_SYNC_QUERY : "SELECT domain,\n" +
        "       base,\n" +
        "       host,\n" +
        "       port,\n" +
        "       status,\n" +
        "       username,\n" +
        "       password,\n" +
        "       base,\n" +
        "       filter,\n" +
        "       ldap_search_dn,\n" +
        "       client,\n" +
        "       user_pre_text,\n" +
        "       user_post_text,\n" +
        "       execution_order\n" +
        "FROM ldap_accounts",

    STICKYNOTES_SYNC_QUERY : "SELECT\n" +
        "       Summary,\n" +
        "       Status,\n" +
        "       Submitter,\n" +
        "       Note\n" +
        "FROM CMN_StickyNotes"
}