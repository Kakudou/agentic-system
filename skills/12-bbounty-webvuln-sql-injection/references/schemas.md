# Schema and Metadata Discovery

Schema discovery is justified only after SQL injection is confirmed and authorization permits assessing reachable data scope. Metadata queries establish what the application database identity can see; they do not prove records are readable or that every listed object is relevant.

## Minimal evidence collection

1. Confirm a safe output or blind oracle and identify the likely DBMS.
2. Request the smallest metadata sample needed to establish catalog access, preferring table and column names over row contents.
3. Narrow by the current database/schema and expected application namespace. Avoid broad catalog enumeration and system objects unless scope requires them.
4. Capture a short, redacted result that identifies the metadata source and access boundary.
5. Stop when the report can explain exposure; only pursue a specific authorized impact question.

## DBMS catalog differences

MySQL, PostgreSQL, and SQL Server expose broadly portable `information_schema` views, though schemas and permissions affect what appears. Oracle commonly uses `all_tables` and `all_tab_columns`; names are often stored in uppercase. SQLite stores object definitions in `sqlite_master` and provides table metadata through pragmas. Provider-specific system catalogs can expose more detail but are less portable and more privilege-sensitive.

## False positives and boundaries

Empty results can mean insufficient privileges, a different schema, view filtering, query-context incompatibility, or no matching objects. Do not guess application table names repeatedly or turn metadata discovery into bulk harvesting. A metadata view response may include platform-maintained objects; distinguish them from application objects before asserting impact.

## Mitigation

Use parameterized application queries and an account whose catalog and data privileges are limited to the application need. Keep production metadata exposure and verbose errors out of client responses. Verify remediation by confirming the original SQL control no longer changes query behavior, not by relying on catalog access failure alone.

## Sources

- https://portswigger.net/web-security/sql-injection/examining-the-database
- https://portswigger.net/web-security/sql-injection/cheat-sheet
