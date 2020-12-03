BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_groups" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"action_time"	datetime NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	integer NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "nlpviewer_backend_document" (
	"id"	integer NOT NULL,
	"name"	varchar(200) NOT NULL,
	"textPack"	text NOT NULL,
	"project_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("project_id") REFERENCES "nlpviewer_backend_project"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id"	integer NOT NULL,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"username"	varchar(150) NOT NULL UNIQUE,
	"last_name"	varchar(150) NOT NULL,
	"email"	varchar(254) NOT NULL,
	"is_staff"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"first_name"	varchar(150) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "guardian_groupobjectpermission" (
	"id"	integer NOT NULL,
	"object_pk"	varchar(255) NOT NULL,
	"content_type_id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "guardian_userobjectpermission" (
	"id"	integer NOT NULL,
	"object_pk"	varchar(255) NOT NULL,
	"content_type_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "nlpviewer_backend_project" (
	"id"	integer NOT NULL,
	"name"	varchar(200) NOT NULL,
	"ontology"	text NOT NULL,
	"user_id"	integer,
	"config"	text,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "django_migrations" ("id","app","name","applied") VALUES (1,'contenttypes','0001_initial','2020-01-07 19:27:22.589475'),
 (2,'auth','0001_initial','2020-01-07 19:27:22.611116'),
 (3,'admin','0001_initial','2020-01-07 19:27:22.628195'),
 (4,'admin','0002_logentry_remove_auto_add','2020-01-07 19:27:22.646755'),
 (5,'admin','0003_logentry_add_action_flag_choices','2020-01-07 19:27:22.666538'),
 (6,'contenttypes','0002_remove_content_type_name','2020-01-07 19:27:22.712908'),
 (7,'auth','0002_alter_permission_name_max_length','2020-01-07 19:27:22.734327'),
 (8,'auth','0003_alter_user_email_max_length','2020-01-07 19:27:22.755350'),
 (9,'auth','0004_alter_user_username_opts','2020-01-07 19:27:22.777539'),
 (10,'auth','0005_alter_user_last_login_null','2020-01-07 19:27:22.802110'),
 (11,'auth','0006_require_contenttypes_0002','2020-01-07 19:27:22.807172'),
 (12,'auth','0007_alter_validators_add_error_messages','2020-01-07 19:27:22.825185'),
 (13,'auth','0008_alter_user_username_max_length','2020-01-07 19:27:22.850459'),
 (14,'auth','0009_alter_user_last_name_max_length','2020-01-07 19:27:22.874728'),
 (15,'auth','0010_alter_group_name_max_length','2020-01-07 19:27:22.894990'),
 (16,'auth','0011_update_proxy_permissions','2020-01-07 19:27:22.911133'),
 (17,'nlpviewer_backend','0001_initial','2020-01-07 19:27:22.959908'),
 (18,'sessions','0001_initial','2020-01-07 19:27:22.976400'),
 (19,'nlpviewer_backend','0002_document_ontology','2020-01-13 18:22:19.963677'),
 (20,'nlpviewer_backend','0003_auto_20200712_0421','2020-07-12 08:22:23.104887'),
 (21,'nlpviewer_backend','0004_auto_20200712_0957','2020-07-12 13:57:31.846937'),
 (22,'nlpviewer_backend','0005_remove_document_ontology','2020-07-23 01:45:42.882931'),
 (23,'auth','0012_alter_user_first_name_max_length','2020-11-09 04:16:47.025873'),
 (24,'guardian','0001_initial','2020-12-03 08:12:09.051445'),
 (25,'guardian','0002_generic_permissions_index','2020-12-03 08:12:09.085970'),
 (26,'nlpviewer_backend','0006_auto_20201203_0206','2020-12-03 08:12:09.117618'),
 (27,'nlpviewer_backend','0007_project_config','2020-12-03 08:12:09.148072'),
 (28,'nlpviewer_backend','0008_auto_20201203_0317','2020-12-03 08:18:01.070955'),
 (29,'nlpviewer_backend','0009_auto_20201203_0318','2020-12-03 08:18:56.952573');
INSERT INTO "django_admin_log" ("id","action_time","object_id","object_repr","change_message","content_type_id","user_id","action_flag") VALUES (1,'2020-12-03 08:14:35.172359','3','normal1','[{"added": {}}]',6,2,1),
 (2,'2020-12-03 08:14:53.318030','4','normal2','[{"added": {}}]',6,2,1),
 (3,'2020-12-03 08:19:18.753114','7','project-2-example','[{"changed": {"fields": ["Ontology", "User"]}}]',9,2,2),
 (4,'2020-12-03 08:19:29.136667','5','project-1-example','[{"changed": {"fields": ["Ontology", "User"]}}]',9,2,2),
 (5,'2020-12-03 08:26:57.041031','7','project-2-example','[{"changed": {"fields": ["Config"]}}]',9,2,2),
 (6,'2020-12-03 08:27:01.086126','5','project-1-example','[{"changed": {"fields": ["Config"]}}]',9,2,2);
INSERT INTO "django_content_type" ("id","app_label","model") VALUES (1,'nlpviewer_backend','document'),
 (2,'nlpviewer_backend','user'),
 (3,'admin','logentry'),
 (4,'auth','permission'),
 (5,'auth','group'),
 (6,'auth','user'),
 (7,'contenttypes','contenttype'),
 (8,'sessions','session'),
 (9,'nlpviewer_backend','project'),
 (10,'guardian','groupobjectpermission'),
 (11,'guardian','userobjectpermission');
INSERT INTO "auth_permission" ("id","content_type_id","codename","name") VALUES (1,1,'add_document','Can add document'),
 (2,1,'change_document','Can change document'),
 (3,1,'delete_document','Can delete document'),
 (4,1,'view_document','Can view document'),
 (5,2,'add_user','Can add user'),
 (6,2,'change_user','Can change user'),
 (7,2,'delete_user','Can delete user'),
 (8,2,'view_user','Can view user'),
 (9,3,'add_logentry','Can add log entry'),
 (10,3,'change_logentry','Can change log entry'),
 (11,3,'delete_logentry','Can delete log entry'),
 (12,3,'view_logentry','Can view log entry'),
 (13,4,'add_permission','Can add permission'),
 (14,4,'change_permission','Can change permission'),
 (15,4,'delete_permission','Can delete permission'),
 (16,4,'view_permission','Can view permission'),
 (17,5,'add_group','Can add group'),
 (18,5,'change_group','Can change group'),
 (19,5,'delete_group','Can delete group'),
 (20,5,'view_group','Can view group'),
 (21,6,'add_user','Can add user'),
 (22,6,'change_user','Can change user'),
 (23,6,'delete_user','Can delete user'),
 (24,6,'view_user','Can view user'),
 (25,7,'add_contenttype','Can add content type'),
 (26,7,'change_contenttype','Can change content type'),
 (27,7,'delete_contenttype','Can delete content type'),
 (28,7,'view_contenttype','Can view content type'),
 (29,8,'add_session','Can add session'),
 (30,8,'change_session','Can change session'),
 (31,8,'delete_session','Can delete session'),
 (32,8,'view_session','Can view session'),
 (33,9,'add_project','Can add project'),
 (34,9,'change_project','Can change project'),
 (35,9,'delete_project','Can delete project'),
 (36,9,'view_project','Can view project'),
 (37,9,'read_project','Can read the project'),
 (38,9,'edit_annotation','Can edit annotation'),
 (39,9,'edit_text','Can edit the document'),
 (40,9,'edit_project','Can edit the project'),
 (41,9,'remove_project','Can remove the project'),
 (42,9,'new_project','Can create in the project'),
 (43,10,'add_groupobjectpermission','Can add group object permission'),
 (44,10,'change_groupobjectpermission','Can change group object permission'),
 (45,10,'delete_groupobjectpermission','Can delete group object permission'),
 (46,10,'view_groupobjectpermission','Can view group object permission'),
 (47,11,'add_userobjectpermission','Can add user object permission'),
 (48,11,'change_userobjectpermission','Can change user object permission'),
 (49,11,'delete_userobjectpermission','Can delete user object permission'),
 (50,11,'view_userobjectpermission','Can view user object permission');
INSERT INTO "django_session" ("session_key","session_data","expire_date") VALUES ('5bci17hbl1zmdrcfn96d2uoqtt6rw3cx','YmE5N2EzNTcwZDYxMzI4NmZkYmVkN2UyMDczMzQ2MDJmYzgyMDc3NTp7InVzZXJfaWQiOjF9','2020-01-21 19:29:33.805122'),
 ('c88qh9fgmv09kxr97fzjpti7t88jl9kp','NzYzMTIyYmEzNDNmYTU2MDBhNTFhODczM2IyYTA5MmU2NzNjMzQ5ODp7InVzZXJfaWQiOiJhYmMifQ==','2020-01-23 16:56:15.090902'),
 ('j9uydmx4kul9uuy52sb9oouuougbuinz','NzYzMTIyYmEzNDNmYTU2MDBhNTFhODczM2IyYTA5MmU2NzNjMzQ5ODp7InVzZXJfaWQiOiJhYmMifQ==','2020-01-23 16:56:33.775621'),
 ('zpkodzozmvghxtrrbho65p90odrot8em','YmE5N2EzNTcwZDYxMzI4NmZkYmVkN2UyMDczMzQ2MDJmYzgyMDc3NTp7InVzZXJfaWQiOjF9','2020-01-27 18:23:01.547376'),
 ('w1c15cm5449zer7f6eiusui9gej90l5p','YmE5N2EzNTcwZDYxMzI4NmZkYmVkN2UyMDczMzQ2MDJmYzgyMDc3NTp7InVzZXJfaWQiOjF9','2020-04-01 20:27:17.150025'),
 ('4kvq3b9jtktfk7kxikvy7pm3fy4191gg','YmE5N2EzNTcwZDYxMzI4NmZkYmVkN2UyMDczMzQ2MDJmYzgyMDc3NTp7InVzZXJfaWQiOjF9','2020-04-30 16:25:15.692429'),
 ('bpcvhclila60tx8czlj6sgjffsjfquee','YmE5N2EzNTcwZDYxMzI4NmZkYmVkN2UyMDczMzQ2MDJmYzgyMDc3NTp7InVzZXJfaWQiOjF9','2020-08-06 02:14:10.417361'),
 ('m1acd0cwcdg0u2ac114y0r93cdjmfcmo','MThkYmI2MGYyNDAyZTIxNjljNDQyNGJmZjExMzhmMzQ3ZWExMzkyZjp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwN2RmMzMwZTNjNDAzYTc1Yzk1NjcyZGVmNDNjODFkM2M0MDI3ZDUxIn0=','2020-12-17 08:14:07.377801'),
 ('5ei4j6nj5pviy911wbvon0w9cyrqy1vp','OWRkNDhjMTgyMGZmNWE5ZmQ1MmFiZmE1Y2Q2ZTNlMzA4Y2IyMmUwYjp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1ZGVhN2IwN2FiMDA0ZDdkOGU2NWQ3YzZlNTQxZWIxMGNmYjYwYTk1In0=','2020-12-17 08:20:05.811215');
INSERT INTO "nlpviewer_backend_document" ("id","name","textPack","project_id") VALUES (42,'project1-doc1-example','{
  "py/object": "forte.data.data_pack.DataPack",
  "py/state": {
    "_text": "Tomorrow ''s summit meeting will bring Ehud Barak and Yasser Arafat to the resort city of Sharm El - eikh . Getting both to attend was not an easy task . The last thing President Clinton did today before heading to the Mideast is go to church -- appropriate , perhaps , given the enormity of the task he and his national security team face in the days ahead . We do have to try to reduce the violee and take a turn back for a period of calmness so that we can move back to a peace process , but even if the violence subsides , Israelis and Palestinians will still have to deal with an open wound -- a scar so long and so deep from these last two weeks , it may be years before there is a real effort at talking peace again . Both sides have almost stepped back six years in terms of their statements and attitudes , six years or more -- before the Oslo accords , when the Israelis promised land and the Palestinians promised security . Today there is only finger pointing . Arafat deliberately launched it in order to attract the attention of the world by paying with the blood of his own people . I urge Mr. Barak to lift the siege of Palestinians , to speak to the Palestinians as its neighbors because they are his neighbors . The Palestinians clearly face the greatest pressure in this summit , since the Israelis are not the only ones blaming them for the outbreak of violence . I think we all know that Arafat is in charge of the Palestinian Authority . He has the responsibility for controlling the violence . But it may not be so easy for Arafat . Today , thousands of Palestinians are calling for continued fighting . Half of the Palestinian population is under the age of 14 and many have been influenced by military factions like Hamas and Hezbollah -- not by Arafat . When you talk about Arafat and the people around him , you have to understand how young this population really is -- how volatile , how close to exploding it really is . Almost no one seems optimistic about the future of the Mideast . That ''s the heartbreak of this region says one State Department official . Whenever you take a step forward , you are bound to be pushed way back . Martha Raddatz , ABC News , the State Department .",
    "annotations": [
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 8,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 8,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 0,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 8,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 957,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 26,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 6,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 26,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 5,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 38,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 937,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Document",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 0,
            "end": 2212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 936
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 9,
            "end": 11,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 2,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "POS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 9,
            "end": 11,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 958,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "POS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 12,
            "end": 18,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 3,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 12,
            "end": 18,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 959,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 19,
            "end": 26,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 4,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 19,
            "end": 26,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 960,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 27,
            "end": 31,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 8,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 27,
            "end": 31,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 7,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 27,
            "end": 31,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 961,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 32,
            "end": 37,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 10,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "bring"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 32,
            "end": 37,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 9,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 32,
            "end": 37,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 962,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 38,
            "end": 42,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 11,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 38,
            "end": 42,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 963,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 38,
            "end": 48,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 13,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 38,
            "end": 48,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 14,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 38,
            "end": 66,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 20,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 38,
            "end": 66,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 19,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 43,
            "end": 48,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 12,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 43,
            "end": 48,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 964,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 49,
            "end": 52,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 15,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 49,
            "end": 52,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 965,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 53,
            "end": 59,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 16,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 53,
            "end": 59,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 966,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 53,
            "end": 66,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 18,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 53,
            "end": 66,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 21,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 60,
            "end": 66,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 17,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 60,
            "end": 66,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 967,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 67,
            "end": 69,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 22,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 67,
            "end": 69,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 968,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 67,
            "end": 104,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 32,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 70,
            "end": 73,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 23,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 70,
            "end": 73,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 969,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 74,
            "end": 80,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 24,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 74,
            "end": 80,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 970,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 81,
            "end": 85,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 25,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 81,
            "end": 85,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 971,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 86,
            "end": 88,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 26,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 86,
            "end": 88,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 972,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 89,
            "end": 94,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 27,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 89,
            "end": 94,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 973,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 89,
            "end": 104,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 31,
          "ner_type": "GPE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 95,
            "end": 97,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 28,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 95,
            "end": 97,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 974,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 98,
            "end": 99,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 29,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 98,
            "end": 99,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 975,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 100,
            "end": 104,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 30,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 100,
            "end": 104,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 976,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 105,
            "end": 106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 33,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 105,
            "end": 106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 977,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 107,
            "end": 114,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 40,
          "framenet_id": "04",
          "is_verb": true,
          "predicate_lemma": "get"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 107,
            "end": 114,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 39,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 107,
            "end": 114,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 978,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 107,
            "end": 129,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 48,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 107,
            "end": 152,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 64,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 107,
            "end": 152,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 938,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 115,
            "end": 119,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 43,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 115,
            "end": 119,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 42,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 115,
            "end": 119,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 41,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 115,
            "end": 119,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 979,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 115,
            "end": 129,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 47,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 120,
            "end": 122,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 44,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 120,
            "end": 122,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 980,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 123,
            "end": 129,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 46,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "attend"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 123,
            "end": 129,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 45,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 123,
            "end": 129,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 981,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 130,
            "end": 133,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 50,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 130,
            "end": 133,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 49,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 130,
            "end": 133,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 982,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 134,
            "end": 137,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 52,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 134,
            "end": 137,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 51,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 134,
            "end": 137,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 983,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 138,
            "end": 140,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 53,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 138,
            "end": 140,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 984,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 138,
            "end": 150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 57,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 141,
            "end": 145,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 54,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 141,
            "end": 145,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 985,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 146,
            "end": 150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 56,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "task"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 146,
            "end": 150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 55,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 146,
            "end": 150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 986,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 151,
            "end": 152,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 58,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 151,
            "end": 152,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 987,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 153,
            "end": 156,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 65,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 153,
            "end": 156,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 988,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 153,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 92,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 153,
            "end": 358,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 157,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 153,
            "end": 358,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 939,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 157,
            "end": 161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 66,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 157,
            "end": 161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 989,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 162,
            "end": 167,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 68,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "thing"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 162,
            "end": 167,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 67,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 162,
            "end": 167,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 990,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 168,
            "end": 177,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 69,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 168,
            "end": 177,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 991,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 168,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 75,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 168,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 72,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 168,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 73,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 168,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 74,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 178,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 71,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 178,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 70,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 178,
            "end": 185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 992,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 186,
            "end": 189,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 77,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "do"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 186,
            "end": 189,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 76,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 186,
            "end": 189,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 993,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 190,
            "end": 195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 79,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 190,
            "end": 195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 82,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 190,
            "end": 195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 81,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 190,
            "end": 195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 80,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "today"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 190,
            "end": 195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 78,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 190,
            "end": 195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 994,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 196,
            "end": 202,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 83,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 196,
            "end": 202,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 995,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 196,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 90,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 203,
            "end": 210,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 85,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "head"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 203,
            "end": 210,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 84,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 203,
            "end": 210,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 996,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 211,
            "end": 213,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 86,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 211,
            "end": 213,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 997,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 211,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 91,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 214,
            "end": 217,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 87,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 214,
            "end": 217,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 998,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 214,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 93,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 218,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 89,
          "ner_type": "LOC"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 218,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 88,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 218,
            "end": 225,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 999,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 226,
            "end": 228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 95,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 226,
            "end": 228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 94,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 226,
            "end": 228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1000,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 229,
            "end": 231,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 97,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "go"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 229,
            "end": 231,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 96,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "9",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 229,
            "end": 231,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1001,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 229,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 136,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 232,
            "end": 234,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 98,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 232,
            "end": 234,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1002,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 232,
            "end": 241,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 100,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 235,
            "end": 241,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 99,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 235,
            "end": 241,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1003,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 242,
            "end": 244,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 101,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 242,
            "end": 244,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1004,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 245,
            "end": 256,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 103,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 245,
            "end": 256,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 102,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 245,
            "end": 256,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1005,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 245,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 137,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 257,
            "end": 258,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 104,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 257,
            "end": 258,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1006,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 259,
            "end": 266,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 106,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 259,
            "end": 266,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 105,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 259,
            "end": 266,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1007,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 267,
            "end": 268,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 107,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 267,
            "end": 268,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1008,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 269,
            "end": 274,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 109,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "give"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 269,
            "end": 274,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 108,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 269,
            "end": 274,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1009,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 275,
            "end": 278,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 110,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 275,
            "end": 278,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1010,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 275,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 138,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 279,
            "end": 287,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 111,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 279,
            "end": 287,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1011,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 288,
            "end": 290,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 112,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 288,
            "end": 290,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1012,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 291,
            "end": 294,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 113,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 291,
            "end": 294,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1013,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 291,
            "end": 299,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 116,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 295,
            "end": 299,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 115,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "task"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 295,
            "end": 299,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 114,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 295,
            "end": 299,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1014,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 300,
            "end": 302,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 118,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 300,
            "end": 302,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 117,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 300,
            "end": 302,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1015,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 300,
            "end": 333,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 127,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 303,
            "end": 306,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 119,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 303,
            "end": 306,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1016,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 307,
            "end": 310,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 121,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 307,
            "end": 310,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 120,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 307,
            "end": 310,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1017,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 311,
            "end": 319,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 122,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 311,
            "end": 319,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1018,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 320,
            "end": 328,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 124,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "security"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 320,
            "end": 328,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 123,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "4",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 320,
            "end": 328,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1019,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 329,
            "end": 333,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 126,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "team"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 329,
            "end": 333,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 125,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 329,
            "end": 333,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1020,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 334,
            "end": 338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 129,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "face"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 334,
            "end": 338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 128,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 334,
            "end": 338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1021,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 339,
            "end": 341,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 130,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 339,
            "end": 341,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1022,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 339,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 139,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 342,
            "end": 345,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 131,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 342,
            "end": 345,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1023,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 342,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 135,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 346,
            "end": 350,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 133,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "day"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 346,
            "end": 350,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 132,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "4",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 346,
            "end": 350,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1024,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 351,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 134,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 351,
            "end": 356,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1025,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 357,
            "end": 358,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 140,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 357,
            "end": 358,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1026,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 361,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 162,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 361,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 159,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 361,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 160,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 361,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 161,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 361,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 158,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 361,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1027,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 723,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 310,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 359,
            "end": 723,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 940,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 362,
            "end": 364,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 164,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "do"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 362,
            "end": 364,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 163,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 362,
            "end": 364,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1028,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 365,
            "end": 369,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 166,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "have"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 365,
            "end": 369,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 165,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "12",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 365,
            "end": 369,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1029,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 370,
            "end": 372,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 167,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 370,
            "end": 372,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1030,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 373,
            "end": 376,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 169,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "try"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 373,
            "end": 376,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 168,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 373,
            "end": 376,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1031,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 377,
            "end": 379,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 170,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 377,
            "end": 379,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1032,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 377,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 209,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 380,
            "end": 386,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 172,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "reduce"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 380,
            "end": 386,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 171,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 380,
            "end": 386,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1033,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 387,
            "end": 390,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 173,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 387,
            "end": 390,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1034,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 387,
            "end": 397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 176,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 387,
            "end": 397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 175,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 391,
            "end": 397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 174,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 391,
            "end": 397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1035,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 398,
            "end": 401,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 177,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 398,
            "end": 401,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1036,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 402,
            "end": 406,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 180,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 402,
            "end": 406,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 179,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "take"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 402,
            "end": 406,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 178,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 402,
            "end": 406,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1037,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 407,
            "end": 408,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 181,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 407,
            "end": 408,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1038,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 409,
            "end": 413,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 183,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "turn"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 409,
            "end": 413,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 182,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 409,
            "end": 413,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1039,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 414,
            "end": 418,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 185,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 414,
            "end": 418,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 184,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 414,
            "end": 418,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1040,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 419,
            "end": 422,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 186,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 419,
            "end": 422,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1041,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 419,
            "end": 443,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 191,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 423,
            "end": 424,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 187,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 423,
            "end": 424,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1042,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 425,
            "end": 431,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 188,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 425,
            "end": 431,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1043,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 432,
            "end": 434,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 189,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 432,
            "end": 434,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1044,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 435,
            "end": 443,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 190,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 435,
            "end": 443,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1045,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 444,
            "end": 446,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 192,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 444,
            "end": 446,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1046,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 444,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 210,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 444,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 211,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 447,
            "end": 451,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 193,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 447,
            "end": 451,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1047,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 452,
            "end": 454,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 196,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 452,
            "end": 454,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 195,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 452,
            "end": 454,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 194,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 452,
            "end": 454,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1048,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 455,
            "end": 458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 198,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 455,
            "end": 458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 197,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 455,
            "end": 458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1049,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 459,
            "end": 463,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 200,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "move"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 459,
            "end": 463,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 199,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 459,
            "end": 463,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1050,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 464,
            "end": 468,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 201,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 464,
            "end": 468,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1051,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 464,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 212,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 469,
            "end": 471,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 202,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 469,
            "end": 471,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1052,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 472,
            "end": 473,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 203,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 472,
            "end": 473,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1053,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 474,
            "end": 479,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 206,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 474,
            "end": 479,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 205,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "peace"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 474,
            "end": 479,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 204,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 474,
            "end": 479,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1054,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 480,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 208,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "process"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 480,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 207,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 480,
            "end": 487,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1055,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 488,
            "end": 489,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 213,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 488,
            "end": 489,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1056,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 490,
            "end": 493,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 214,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 490,
            "end": 493,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1057,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 494,
            "end": 498,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 215,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 494,
            "end": 498,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1058,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 499,
            "end": 501,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 216,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 499,
            "end": 501,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1059,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 502,
            "end": 505,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 217,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 502,
            "end": 505,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1060,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 502,
            "end": 514,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 220,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 502,
            "end": 514,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 219,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 506,
            "end": 514,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 218,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 506,
            "end": 514,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1061,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 515,
            "end": 523,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 222,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "subside"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 515,
            "end": 523,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 221,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 515,
            "end": 523,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1062,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 524,
            "end": 525,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 223,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 524,
            "end": 525,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1063,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 526,
            "end": 534,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 225,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 526,
            "end": 534,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 224,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 526,
            "end": 534,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1064,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 526,
            "end": 551,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 229,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 535,
            "end": 538,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 226,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 535,
            "end": 538,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1065,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 539,
            "end": 551,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 228,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 539,
            "end": 551,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 227,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 539,
            "end": 551,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1066,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 552,
            "end": 556,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 231,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 552,
            "end": 556,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 230,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 552,
            "end": 556,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1067,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 557,
            "end": 562,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 232,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 557,
            "end": 562,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1068,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 563,
            "end": 567,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 234,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "have"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 563,
            "end": 567,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 233,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "12",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 563,
            "end": 567,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1069,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 568,
            "end": 570,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 235,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 568,
            "end": 570,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1070,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 571,
            "end": 575,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 237,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "deal"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 571,
            "end": 575,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 236,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 571,
            "end": 575,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1071,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 576,
            "end": 580,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 238,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 576,
            "end": 580,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1072,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 576,
            "end": 721,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 281,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 581,
            "end": 583,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 239,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 581,
            "end": 583,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1073,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 584,
            "end": 588,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 240,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 584,
            "end": 588,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1074,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 589,
            "end": 594,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 242,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "wound"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 589,
            "end": 594,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 241,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "4",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 589,
            "end": 594,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1075,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 595,
            "end": 597,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 243,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 595,
            "end": 597,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1076,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 598,
            "end": 599,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 244,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 598,
            "end": 599,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1077,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 600,
            "end": 604,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 245,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 600,
            "end": 604,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1078,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 605,
            "end": 607,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 246,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 605,
            "end": 607,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1079,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 608,
            "end": 612,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 247,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 608,
            "end": 612,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1080,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 613,
            "end": 616,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 248,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 613,
            "end": 616,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1081,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 617,
            "end": 619,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 249,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 617,
            "end": 619,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1082,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 620,
            "end": 624,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 250,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 620,
            "end": 624,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1083,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 625,
            "end": 629,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 251,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 625,
            "end": 629,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1084,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 630,
            "end": 635,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 252,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 630,
            "end": 635,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1085,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 630,
            "end": 650,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 256,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 636,
            "end": 640,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 253,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 636,
            "end": 640,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1086,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 641,
            "end": 644,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 254,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 641,
            "end": 644,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1087,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 645,
            "end": 650,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 255,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 645,
            "end": 650,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1088,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 651,
            "end": 652,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 257,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 651,
            "end": 652,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1089,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 653,
            "end": 655,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 258,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 653,
            "end": 655,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1090,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 656,
            "end": 659,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 260,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 656,
            "end": 659,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 259,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 656,
            "end": 659,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1091,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 660,
            "end": 662,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 262,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 660,
            "end": 662,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 261,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "6",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 660,
            "end": 662,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1092,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 663,
            "end": 668,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 264,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 663,
            "end": 668,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 265,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 663,
            "end": 668,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 263,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 663,
            "end": 668,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1093,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 669,
            "end": 675,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 266,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 669,
            "end": 675,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1094,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 669,
            "end": 721,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 282,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 676,
            "end": 681,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 267,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "EX",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 676,
            "end": 681,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1095,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "EX",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 682,
            "end": 684,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 269,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 682,
            "end": 684,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 268,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 682,
            "end": 684,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1096,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 685,
            "end": 686,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 270,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 685,
            "end": 686,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1097,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 685,
            "end": 721,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 283,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 687,
            "end": 691,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 271,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 687,
            "end": 691,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1098,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 692,
            "end": 698,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 273,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "effort"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 692,
            "end": 698,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 272,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 692,
            "end": 698,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1099,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 699,
            "end": 701,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 274,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 699,
            "end": 701,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1100,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 702,
            "end": 709,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 276,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "talk"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 702,
            "end": 709,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 275,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 702,
            "end": 709,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1101,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 710,
            "end": 715,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 279,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 710,
            "end": 715,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 278,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "peace"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 710,
            "end": 715,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 277,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 710,
            "end": 715,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1102,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 716,
            "end": 721,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 284,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 716,
            "end": 721,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 280,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 716,
            "end": 721,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1103,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 722,
            "end": 723,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 285,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 722,
            "end": 723,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1104,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 724,
            "end": 728,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 311,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 724,
            "end": 728,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1105,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 724,
            "end": 734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 315,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 724,
            "end": 734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 314,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 724,
            "end": 934,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 398,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 724,
            "end": 934,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 941,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 729,
            "end": 734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 313,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "side"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 729,
            "end": 734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 312,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 729,
            "end": 734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1106,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 735,
            "end": 739,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 317,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "have"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 735,
            "end": 739,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 316,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 735,
            "end": 739,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1107,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 740,
            "end": 746,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 319,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 740,
            "end": 746,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 318,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 740,
            "end": 746,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1108,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 747,
            "end": 754,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 321,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "step"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 747,
            "end": 754,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 320,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 747,
            "end": 754,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1109,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 755,
            "end": 759,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 323,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 755,
            "end": 759,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 322,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 755,
            "end": 759,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1110,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 760,
            "end": 763,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 324,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 760,
            "end": 763,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1111,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 760,
            "end": 769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 326,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 760,
            "end": 769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 328,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 760,
            "end": 769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 327,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 764,
            "end": 769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 325,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 764,
            "end": 769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1112,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 770,
            "end": 772,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 329,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 770,
            "end": 772,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1113,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 770,
            "end": 812,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 341,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 773,
            "end": 778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 331,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "term"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 773,
            "end": 778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 330,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "9",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 773,
            "end": 778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1114,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 779,
            "end": 781,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 332,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 779,
            "end": 781,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1115,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 782,
            "end": 787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 335,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 782,
            "end": 787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 334,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 782,
            "end": 787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 333,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 782,
            "end": 787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1116,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 788,
            "end": 798,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 337,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "statement"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 788,
            "end": 798,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 336,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 788,
            "end": 798,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1117,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 799,
            "end": 802,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 338,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 799,
            "end": 802,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1118,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 803,
            "end": 812,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 340,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "attitude"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 803,
            "end": 812,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 339,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 803,
            "end": 812,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1119,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 813,
            "end": 814,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 342,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 813,
            "end": 814,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1120,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 815,
            "end": 818,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 343,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 815,
            "end": 818,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1121,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 815,
            "end": 824,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 345,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 815,
            "end": 832,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 348,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 815,
            "end": 832,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 349,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 819,
            "end": 824,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 344,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 819,
            "end": 824,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1122,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 825,
            "end": 827,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 346,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 825,
            "end": 827,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1123,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 828,
            "end": 832,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 347,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJR",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 828,
            "end": 832,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1124,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJR",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 833,
            "end": 835,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 350,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 833,
            "end": 835,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1125,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 836,
            "end": 842,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 351,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 836,
            "end": 842,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1126,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 836,
            "end": 932,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 381,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 843,
            "end": 846,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 352,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 843,
            "end": 846,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1127,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 843,
            "end": 859,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 355,
          "ner_type": "LAW"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 847,
            "end": 851,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 353,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 847,
            "end": 851,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1128,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 852,
            "end": 859,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 356,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "accord"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 852,
            "end": 859,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 354,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 852,
            "end": 859,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1129,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 860,
            "end": 861,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 357,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 860,
            "end": 861,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1130,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 862,
            "end": 866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 359,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 862,
            "end": 866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 360,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 862,
            "end": 866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 358,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 862,
            "end": 866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1131,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 867,
            "end": 870,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 361,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 867,
            "end": 870,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1132,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 867,
            "end": 879,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 365,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 867,
            "end": 879,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 364,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 871,
            "end": 879,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 363,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 871,
            "end": 879,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 362,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 871,
            "end": 879,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1133,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 880,
            "end": 888,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 367,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "promise"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 880,
            "end": 888,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 366,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 880,
            "end": 888,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1134,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 889,
            "end": 893,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 370,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 889,
            "end": 893,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 369,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "land"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 889,
            "end": 893,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 368,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 889,
            "end": 893,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1135,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 894,
            "end": 897,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 371,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 894,
            "end": 897,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1136,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 898,
            "end": 901,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 372,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 898,
            "end": 901,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1137,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 898,
            "end": 914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 376,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 898,
            "end": 914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 375,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 902,
            "end": 914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 374,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 902,
            "end": 914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 373,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 902,
            "end": 914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1138,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 915,
            "end": 923,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 378,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "promise"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 915,
            "end": 923,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 377,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 915,
            "end": 923,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1139,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 924,
            "end": 932,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 382,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 924,
            "end": 932,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 380,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "security"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 924,
            "end": 932,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 379,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 924,
            "end": 932,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1140,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 933,
            "end": 934,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 383,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 933,
            "end": 934,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1141,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 940,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 400,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 940,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 403,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 940,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 402,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 940,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 401,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "today"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 940,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 399,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 940,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1142,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 972,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 415,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 935,
            "end": 972,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 942,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 941,
            "end": 946,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 404,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "EX",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 941,
            "end": 946,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1143,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "EX",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 947,
            "end": 949,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 406,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 947,
            "end": 949,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 405,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 947,
            "end": 949,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1144,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 950,
            "end": 954,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 407,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 950,
            "end": 954,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1145,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 950,
            "end": 970,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 411,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 950,
            "end": 970,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 410,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 955,
            "end": 961,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 408,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 955,
            "end": 961,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1146,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RBR",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 962,
            "end": 970,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 409,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 962,
            "end": 970,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1147,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 971,
            "end": 972,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 412,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 971,
            "end": 972,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1148,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 417,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 421,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 418,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 419,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 420,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 416,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1149,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 1096,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 468,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 973,
            "end": 1096,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 943,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 980,
            "end": 992,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 423,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 980,
            "end": 992,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 422,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 980,
            "end": 992,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1150,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 993,
            "end": 1001,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 425,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "launch"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 993,
            "end": 1001,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 424,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 993,
            "end": 1001,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1151,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1002,
            "end": 1004,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 428,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1002,
            "end": 1004,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 427,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1002,
            "end": 1004,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 426,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1002,
            "end": 1004,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1152,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1005,
            "end": 1007,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 429,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1005,
            "end": 1007,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1153,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1005,
            "end": 1094,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 455,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1008,
            "end": 1013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 431,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "order"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1008,
            "end": 1013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 430,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "10",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1008,
            "end": 1013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1154,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1014,
            "end": 1016,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 432,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1014,
            "end": 1016,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1155,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1017,
            "end": 1024,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 434,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "attract"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1017,
            "end": 1024,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 433,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1017,
            "end": 1024,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1156,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1025,
            "end": 1028,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 435,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1025,
            "end": 1028,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1157,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1025,
            "end": 1051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 442,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1029,
            "end": 1038,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 437,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "attention"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1029,
            "end": 1038,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 436,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1029,
            "end": 1038,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1158,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1039,
            "end": 1041,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 438,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1039,
            "end": 1041,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1159,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1042,
            "end": 1045,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 439,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1042,
            "end": 1045,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1160,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1046,
            "end": 1051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 441,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "world"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1046,
            "end": 1051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 440,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1046,
            "end": 1051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1161,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1052,
            "end": 1054,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 443,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1052,
            "end": 1054,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1162,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1052,
            "end": 1094,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 456,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1055,
            "end": 1061,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 445,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "pay"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1055,
            "end": 1061,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 444,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1055,
            "end": 1061,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1163,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1062,
            "end": 1066,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 446,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1062,
            "end": 1066,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1164,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1062,
            "end": 1094,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 457,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1067,
            "end": 1070,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 447,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1067,
            "end": 1070,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1165,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1071,
            "end": 1076,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 448,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1071,
            "end": 1076,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1166,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1077,
            "end": 1079,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 449,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1077,
            "end": 1079,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1167,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1080,
            "end": 1083,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 451,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1080,
            "end": 1083,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 450,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1080,
            "end": 1083,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1168,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1084,
            "end": 1087,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 452,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1084,
            "end": 1087,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1169,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1088,
            "end": 1094,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 454,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "people"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1088,
            "end": 1094,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 453,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1088,
            "end": 1094,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1170,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1095,
            "end": 1096,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 458,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1095,
            "end": 1096,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1171,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1097,
            "end": 1098,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 471,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1097,
            "end": 1098,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 470,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1097,
            "end": 1098,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 469,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1097,
            "end": 1098,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1172,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1097,
            "end": 1107,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 944,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1097,
            "end": 1228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 530,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1099,
            "end": 1103,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 473,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "urge"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1099,
            "end": 1103,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 472,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1099,
            "end": 1103,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1173,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1104,
            "end": 1107,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 474,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1104,
            "end": 1107,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1174,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1104,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 480,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1104,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 477,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1104,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 478,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1104,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 479,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1108,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 476,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1108,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 475,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1108,
            "end": 1113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1175,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1108,
            "end": 1228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 945,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1114,
            "end": 1116,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 481,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1114,
            "end": 1116,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1176,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1114,
            "end": 1226,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 515,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1117,
            "end": 1121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 483,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "lift"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1117,
            "end": 1121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 482,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1117,
            "end": 1121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1177,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1122,
            "end": 1125,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 484,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1122,
            "end": 1125,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1178,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1122,
            "end": 1147,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 489,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1126,
            "end": 1131,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 485,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1126,
            "end": 1131,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1179,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1132,
            "end": 1134,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 486,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1132,
            "end": 1134,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1180,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1135,
            "end": 1147,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 488,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1135,
            "end": 1147,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 490,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1135,
            "end": 1147,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 487,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1135,
            "end": 1147,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1181,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1148,
            "end": 1149,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 491,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1148,
            "end": 1149,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1182,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1150,
            "end": 1152,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 492,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1150,
            "end": 1152,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1183,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1153,
            "end": 1158,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 494,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "speak"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1153,
            "end": 1158,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 493,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1153,
            "end": 1158,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1184,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1159,
            "end": 1161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 495,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1159,
            "end": 1161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1185,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1159,
            "end": 1178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 499,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1162,
            "end": 1165,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 496,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1162,
            "end": 1165,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1186,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1162,
            "end": 1178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 500,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1166,
            "end": 1178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 498,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1166,
            "end": 1178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 497,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1166,
            "end": 1178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1187,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1179,
            "end": 1181,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 501,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1179,
            "end": 1181,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1188,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1179,
            "end": 1195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 505,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1182,
            "end": 1185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 503,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1182,
            "end": 1185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 502,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1182,
            "end": 1185,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1189,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1186,
            "end": 1195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 504,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1186,
            "end": 1195,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1190,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1196,
            "end": 1203,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 506,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1196,
            "end": 1203,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1191,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1196,
            "end": 1226,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 516,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1204,
            "end": 1208,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 509,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1204,
            "end": 1208,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 508,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1204,
            "end": 1208,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 507,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1204,
            "end": 1208,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1192,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1209,
            "end": 1212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 511,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1209,
            "end": 1212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 510,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1209,
            "end": 1212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1193,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1213,
            "end": 1216,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 513,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1213,
            "end": 1216,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 512,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1213,
            "end": 1216,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1194,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP$",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1213,
            "end": 1226,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 517,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1217,
            "end": 1226,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 514,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1217,
            "end": 1226,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1195,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1227,
            "end": 1228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 518,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1227,
            "end": 1228,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1196,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1229,
            "end": 1232,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 531,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1229,
            "end": 1232,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1197,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1229,
            "end": 1245,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 535,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1229,
            "end": 1245,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 534,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1229,
            "end": 1382,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 590,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1229,
            "end": 1382,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 946,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1233,
            "end": 1245,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 533,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1233,
            "end": 1245,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 532,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1233,
            "end": 1245,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1198,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1246,
            "end": 1253,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 537,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1246,
            "end": 1253,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 536,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1246,
            "end": 1253,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1199,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1254,
            "end": 1258,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 539,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "face"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1254,
            "end": 1258,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 538,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1254,
            "end": 1258,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1200,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1259,
            "end": 1262,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 540,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1259,
            "end": 1262,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1201,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1259,
            "end": 1295,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 548,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1263,
            "end": 1271,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 541,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1263,
            "end": 1271,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1202,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1272,
            "end": 1280,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 543,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "pressure"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1272,
            "end": 1280,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 542,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1272,
            "end": 1280,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1203,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1281,
            "end": 1283,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 544,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1281,
            "end": 1283,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1204,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1284,
            "end": 1288,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 545,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1284,
            "end": 1288,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1205,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1284,
            "end": 1295,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 549,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1289,
            "end": 1295,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 547,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "summit"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1289,
            "end": 1295,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 546,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1289,
            "end": 1295,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1206,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1296,
            "end": 1297,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 550,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1296,
            "end": 1297,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1207,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1298,
            "end": 1303,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 551,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1298,
            "end": 1303,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1208,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1298,
            "end": 1380,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 576,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1304,
            "end": 1307,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 552,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1304,
            "end": 1307,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1209,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1304,
            "end": 1316,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 556,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1304,
            "end": 1316,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 555,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1308,
            "end": 1316,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 554,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1308,
            "end": 1316,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 553,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1308,
            "end": 1316,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1210,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1317,
            "end": 1320,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 558,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1317,
            "end": 1320,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 557,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1317,
            "end": 1320,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1211,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1321,
            "end": 1324,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 560,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1321,
            "end": 1324,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 559,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1321,
            "end": 1324,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1212,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1325,
            "end": 1328,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 561,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1325,
            "end": 1328,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1213,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1325,
            "end": 1338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 565,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1325,
            "end": 1380,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 577,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1329,
            "end": 1333,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 562,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1329,
            "end": 1333,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1214,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1334,
            "end": 1338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 564,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "one"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1334,
            "end": 1338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 563,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1334,
            "end": 1338,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1215,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1339,
            "end": 1346,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 567,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "blame"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1339,
            "end": 1346,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 566,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1339,
            "end": 1346,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1216,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1347,
            "end": 1351,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 570,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1347,
            "end": 1351,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 569,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1347,
            "end": 1351,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 568,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1347,
            "end": 1351,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1217,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1352,
            "end": 1355,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 571,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1352,
            "end": 1355,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1218,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1352,
            "end": 1380,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 578,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1356,
            "end": 1359,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 572,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1356,
            "end": 1359,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1219,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1360,
            "end": 1368,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 573,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1360,
            "end": 1368,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1220,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1369,
            "end": 1371,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 574,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1369,
            "end": 1371,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1221,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1372,
            "end": 1380,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 575,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1372,
            "end": 1380,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1222,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1381,
            "end": 1382,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 579,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1381,
            "end": 1382,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1223,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1383,
            "end": 1384,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 592,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1383,
            "end": 1384,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 591,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1383,
            "end": 1384,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1224,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1383,
            "end": 1458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 625,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1383,
            "end": 1458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 947,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1385,
            "end": 1390,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 594,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "think"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1385,
            "end": 1390,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 593,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1385,
            "end": 1390,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1225,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1391,
            "end": 1393,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 595,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1391,
            "end": 1393,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1226,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1391,
            "end": 1397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 597,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1391,
            "end": 1456,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 615,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1394,
            "end": 1397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 596,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1394,
            "end": 1397,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1227,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1398,
            "end": 1402,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 599,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "know"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1398,
            "end": 1402,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 598,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1398,
            "end": 1402,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1228,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1403,
            "end": 1407,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 600,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1403,
            "end": 1407,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1229,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1403,
            "end": 1456,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 616,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1408,
            "end": 1414,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 602,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1408,
            "end": 1414,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 604,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1408,
            "end": 1414,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 603,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1408,
            "end": 1414,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 601,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1408,
            "end": 1414,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1230,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1415,
            "end": 1417,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 606,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1415,
            "end": 1417,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 605,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1415,
            "end": 1417,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1231,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1418,
            "end": 1420,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 607,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1418,
            "end": 1420,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1232,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1418,
            "end": 1456,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 617,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1421,
            "end": 1427,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 609,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "charge"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1421,
            "end": 1427,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 608,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "8",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1421,
            "end": 1427,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1233,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1428,
            "end": 1430,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 610,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1428,
            "end": 1430,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1234,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1431,
            "end": 1434,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 611,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1431,
            "end": 1434,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1235,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1431,
            "end": 1456,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 614,
          "ner_type": "ORG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1435,
            "end": 1446,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 612,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1435,
            "end": 1446,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1236,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1447,
            "end": 1456,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 613,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1447,
            "end": 1456,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1237,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1457,
            "end": 1458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 618,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1457,
            "end": 1458,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1238,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1459,
            "end": 1461,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 628,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1459,
            "end": 1461,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 627,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1459,
            "end": 1461,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 626,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1459,
            "end": 1461,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1239,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1459,
            "end": 1515,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 647,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1459,
            "end": 1515,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 948,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1462,
            "end": 1465,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 630,
          "framenet_id": "03",
          "is_verb": true,
          "predicate_lemma": "have"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1462,
            "end": 1465,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 629,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1462,
            "end": 1465,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1240,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1466,
            "end": 1469,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 631,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1466,
            "end": 1469,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1241,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1466,
            "end": 1513,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 640,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1470,
            "end": 1484,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 633,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "responsibility"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1470,
            "end": 1484,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 632,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1470,
            "end": 1484,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1242,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1485,
            "end": 1488,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 634,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1485,
            "end": 1488,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1243,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1489,
            "end": 1500,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 637,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1489,
            "end": 1500,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 636,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "control"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1489,
            "end": 1500,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 635,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1489,
            "end": 1500,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1244,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1501,
            "end": 1504,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 638,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1501,
            "end": 1504,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1245,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1501,
            "end": 1513,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 642,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1501,
            "end": 1513,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 641,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1505,
            "end": 1513,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 639,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1505,
            "end": 1513,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1246,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1514,
            "end": 1515,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 643,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1514,
            "end": 1515,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1247,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1516,
            "end": 1519,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 649,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1516,
            "end": 1519,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 648,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1516,
            "end": 1519,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1248,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1516,
            "end": 1554,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 672,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1516,
            "end": 1554,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 949,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1520,
            "end": 1522,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 652,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1520,
            "end": 1522,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 651,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1520,
            "end": 1522,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 650,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1520,
            "end": 1522,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1249,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1523,
            "end": 1526,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 654,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1523,
            "end": 1526,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 653,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1523,
            "end": 1526,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1250,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "MD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1527,
            "end": 1530,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 656,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1527,
            "end": 1530,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 655,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1527,
            "end": 1530,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1251,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1531,
            "end": 1533,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 658,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1531,
            "end": 1533,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 657,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1531,
            "end": 1533,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1252,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1534,
            "end": 1536,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 659,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1534,
            "end": 1536,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1253,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1534,
            "end": 1552,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 664,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1537,
            "end": 1541,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 660,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1537,
            "end": 1541,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1254,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1542,
            "end": 1545,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 661,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1542,
            "end": 1545,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1255,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1546,
            "end": 1552,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 663,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1546,
            "end": 1552,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 665,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1546,
            "end": 1552,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 662,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1546,
            "end": 1552,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1256,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1553,
            "end": 1554,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 666,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1553,
            "end": 1554,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1257,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1560,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 674,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1560,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 677,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1560,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 676,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1560,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 675,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "today"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1560,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 673,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1560,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1258,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1625,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 697,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1555,
            "end": 1625,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 950,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1561,
            "end": 1562,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 678,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1561,
            "end": 1562,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1259,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1563,
            "end": 1572,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 680,
          "ner_type": "CARDINAL"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1563,
            "end": 1572,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 679,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1563,
            "end": 1572,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1260,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1563,
            "end": 1588,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 684,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1573,
            "end": 1575,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 681,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1573,
            "end": 1575,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1261,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1576,
            "end": 1588,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 683,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1576,
            "end": 1588,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 682,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1576,
            "end": 1588,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1262,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNPS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1589,
            "end": 1592,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 686,
          "framenet_id": "03",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1589,
            "end": 1592,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 685,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1589,
            "end": 1592,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1263,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1593,
            "end": 1600,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 688,
          "framenet_id": "03",
          "is_verb": true,
          "predicate_lemma": "call"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1593,
            "end": 1600,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 687,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1593,
            "end": 1600,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1264,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1601,
            "end": 1604,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 689,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1601,
            "end": 1604,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1265,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1601,
            "end": 1623,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 692,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1605,
            "end": 1614,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 690,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1605,
            "end": 1614,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1266,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1615,
            "end": 1623,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 691,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1615,
            "end": 1623,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1267,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1624,
            "end": 1625,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 693,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1624,
            "end": 1625,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1268,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1630,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 699,
          "ner_type": "CARDINAL"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1630,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 700,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "half"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1630,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 698,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1630,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1269,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1660,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 709,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1660,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 707,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 751,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1626,
            "end": 1778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 951,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1631,
            "end": 1633,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 701,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1631,
            "end": 1633,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1270,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1634,
            "end": 1637,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 702,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1634,
            "end": 1637,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1271,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1634,
            "end": 1660,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 708,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1638,
            "end": 1649,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 704,
          "ner_type": "NORP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1638,
            "end": 1649,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 703,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1638,
            "end": 1649,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1272,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1650,
            "end": 1660,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 706,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "population"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1650,
            "end": 1660,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 705,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1650,
            "end": 1660,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1273,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1661,
            "end": 1663,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 711,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1661,
            "end": 1663,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 710,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1661,
            "end": 1663,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1274,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1664,
            "end": 1669,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 712,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1664,
            "end": 1669,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1275,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1664,
            "end": 1683,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 719,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1670,
            "end": 1673,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 713,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1670,
            "end": 1673,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1276,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1670,
            "end": 1683,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 718,
          "ner_type": "DATE"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1674,
            "end": 1677,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 715,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "age"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1674,
            "end": 1677,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 714,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1674,
            "end": 1677,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1277,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1678,
            "end": 1680,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 716,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1678,
            "end": 1680,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1278,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1681,
            "end": 1683,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 717,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1681,
            "end": 1683,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1279,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1684,
            "end": 1687,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 720,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1684,
            "end": 1687,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1280,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1688,
            "end": 1692,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 722,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1688,
            "end": 1692,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 721,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1688,
            "end": 1692,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1281,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1693,
            "end": 1697,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 724,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "have"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1693,
            "end": 1697,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 723,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1693,
            "end": 1697,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1282,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1698,
            "end": 1702,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 726,
          "framenet_id": "03",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1698,
            "end": 1702,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 725,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1698,
            "end": 1702,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1283,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1703,
            "end": 1713,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 728,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "influence"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1703,
            "end": 1713,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 727,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1703,
            "end": 1713,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1284,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1714,
            "end": 1716,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 729,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1714,
            "end": 1716,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1285,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1714,
            "end": 1776,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 744,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1717,
            "end": 1725,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 730,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1717,
            "end": 1725,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1286,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1726,
            "end": 1734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 732,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "faction"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1726,
            "end": 1734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 731,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1726,
            "end": 1734,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1287,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1735,
            "end": 1739,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 733,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1735,
            "end": 1739,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1288,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1740,
            "end": 1745,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 735,
          "ner_type": "ORG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1740,
            "end": 1745,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 734,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1740,
            "end": 1745,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1289,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1746,
            "end": 1749,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 736,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1746,
            "end": 1749,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1290,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1750,
            "end": 1759,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 738,
          "ner_type": "ORG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1750,
            "end": 1759,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 737,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1750,
            "end": 1759,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1291,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1760,
            "end": 1762,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 739,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1760,
            "end": 1762,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1292,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1763,
            "end": 1766,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 740,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1763,
            "end": 1766,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1293,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1767,
            "end": 1769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 741,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1767,
            "end": 1769,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1294,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1770,
            "end": 1776,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 743,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1770,
            "end": 1776,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 745,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1770,
            "end": 1776,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 742,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1770,
            "end": 1776,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1295,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1777,
            "end": 1778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 746,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1777,
            "end": 1778,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1296,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1779,
            "end": 1783,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 753,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1779,
            "end": 1783,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 752,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1779,
            "end": 1783,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1297,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1779,
            "end": 1948,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 819,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1779,
            "end": 1948,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 952,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1784,
            "end": 1787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 755,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1784,
            "end": 1787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 754,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1784,
            "end": 1787,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1298,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1788,
            "end": 1792,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 757,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "talk"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1788,
            "end": 1792,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 756,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1788,
            "end": 1792,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1299,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1793,
            "end": 1798,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 758,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1793,
            "end": 1798,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1300,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1793,
            "end": 1831,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 768,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1799,
            "end": 1805,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 760,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1799,
            "end": 1805,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 761,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1799,
            "end": 1805,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 759,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1799,
            "end": 1805,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1301,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1806,
            "end": 1809,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 762,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1806,
            "end": 1809,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1302,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CC",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1810,
            "end": 1813,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 763,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1810,
            "end": 1813,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1303,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1814,
            "end": 1820,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 765,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "people"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1814,
            "end": 1820,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 764,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1814,
            "end": 1820,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1304,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNS",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1821,
            "end": 1827,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 766,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1821,
            "end": 1827,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1305,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1828,
            "end": 1831,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 769,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1828,
            "end": 1831,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 767,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1828,
            "end": 1831,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1306,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1832,
            "end": 1833,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 770,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1832,
            "end": 1833,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1307,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1834,
            "end": 1837,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 772,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1834,
            "end": 1837,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 771,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1834,
            "end": 1837,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1308,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1838,
            "end": 1842,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 774,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "have"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1838,
            "end": 1842,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 773,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "12",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1838,
            "end": 1842,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1309,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1843,
            "end": 1845,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 775,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1843,
            "end": 1845,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1310,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1846,
            "end": 1856,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 777,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "understand"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1846,
            "end": 1856,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 776,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1846,
            "end": 1856,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1311,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1857,
            "end": 1860,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 778,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1857,
            "end": 1860,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1312,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1857,
            "end": 1866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 780,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1857,
            "end": 1946,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 806,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1861,
            "end": 1866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 779,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1861,
            "end": 1866,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1313,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1867,
            "end": 1871,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 781,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1867,
            "end": 1871,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1314,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1867,
            "end": 1882,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 785,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1867,
            "end": 1882,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 784,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1872,
            "end": 1882,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 783,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "population"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1872,
            "end": 1882,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 782,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1872,
            "end": 1882,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1315,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1883,
            "end": 1889,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 787,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1883,
            "end": 1889,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 786,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1883,
            "end": 1889,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1316,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1890,
            "end": 1892,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 789,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1890,
            "end": 1892,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 788,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1890,
            "end": 1892,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1317,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1893,
            "end": 1895,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 790,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1893,
            "end": 1895,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1318,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ":",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1896,
            "end": 1899,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 791,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1896,
            "end": 1899,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1319,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1896,
            "end": 1933,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 798,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1900,
            "end": 1908,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 792,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1900,
            "end": 1908,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1320,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1909,
            "end": 1910,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 793,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1909,
            "end": 1910,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1321,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1911,
            "end": 1914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 794,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1911,
            "end": 1914,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1322,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1915,
            "end": 1920,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 795,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1915,
            "end": 1920,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1323,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1921,
            "end": 1923,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 796,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1921,
            "end": 1923,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1324,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1924,
            "end": 1933,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 797,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1924,
            "end": 1933,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1325,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBG",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1934,
            "end": 1936,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 801,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1934,
            "end": 1936,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 800,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1934,
            "end": 1936,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 799,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1934,
            "end": 1936,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1326,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1937,
            "end": 1943,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 803,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1937,
            "end": 1943,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 802,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1937,
            "end": 1943,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1327,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1944,
            "end": 1946,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 805,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1944,
            "end": 1946,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 804,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1944,
            "end": 1946,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1328,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1947,
            "end": 1948,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 807,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1947,
            "end": 1948,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1329,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1949,
            "end": 1955,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 820,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1949,
            "end": 1955,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1330,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1949,
            "end": 1962,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 824,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1949,
            "end": 2013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 841,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1949,
            "end": 2013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 953,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1956,
            "end": 1958,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 821,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1956,
            "end": 1958,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1331,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1959,
            "end": 1962,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 823,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "one"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1959,
            "end": 1962,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 822,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": "2",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1959,
            "end": 1962,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1332,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1963,
            "end": 1968,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 826,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "seem"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1963,
            "end": 1968,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 825,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1963,
            "end": 1968,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1333,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1969,
            "end": 1979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 827,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1969,
            "end": 1979,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1334,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1969,
            "end": 2011,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 836,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1980,
            "end": 1985,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 828,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1980,
            "end": 1985,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1335,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1986,
            "end": 1989,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 829,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1986,
            "end": 1989,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1336,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1990,
            "end": 1996,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 831,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "future"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1990,
            "end": 1996,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 830,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1990,
            "end": 1996,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1337,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1997,
            "end": 1999,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 832,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 1997,
            "end": 1999,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1338,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2000,
            "end": 2003,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 833,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2000,
            "end": 2003,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1339,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2000,
            "end": 2011,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 837,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2004,
            "end": 2011,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 835,
          "ner_type": "LOC"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2004,
            "end": 2011,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 834,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2004,
            "end": 2011,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1340,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2012,
            "end": 2013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 838,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2012,
            "end": 2013,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1341,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2014,
            "end": 2018,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 842,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2014,
            "end": 2018,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1342,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2014,
            "end": 2051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 851,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2014,
            "end": 2088,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 864,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2014,
            "end": 2088,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 954,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2019,
            "end": 2021,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 844,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2019,
            "end": 2021,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 843,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2019,
            "end": 2021,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1343,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2022,
            "end": 2025,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 845,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2022,
            "end": 2025,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1344,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2026,
            "end": 2036,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 846,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2026,
            "end": 2036,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1345,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2037,
            "end": 2039,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 847,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2037,
            "end": 2039,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1346,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2040,
            "end": 2044,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 848,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2040,
            "end": 2044,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1347,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2040,
            "end": 2051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 852,
          "ner_type": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2045,
            "end": 2051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 850,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "region"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2045,
            "end": 2051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 849,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "3",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2045,
            "end": 2051,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1348,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2052,
            "end": 2056,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 854,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "say"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2052,
            "end": 2056,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 853,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2052,
            "end": 2056,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1349,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBZ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2057,
            "end": 2060,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 855,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2057,
            "end": 2060,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1350,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "CD",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2057,
            "end": 2086,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 860,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2061,
            "end": 2066,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 856,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2061,
            "end": 2066,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1351,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2061,
            "end": 2077,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 858,
          "ner_type": "ORG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2067,
            "end": 2077,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 857,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2067,
            "end": 2077,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1352,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2078,
            "end": 2086,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 859,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2078,
            "end": 2086,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1353,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2087,
            "end": 2088,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 861,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2087,
            "end": 2088,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1354,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2089,
            "end": 2097,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 866,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2089,
            "end": 2097,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 865,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2089,
            "end": 2097,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1355,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "WRB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2089,
            "end": 2121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 877,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2089,
            "end": 2161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 905,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2089,
            "end": 2161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 955,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2098,
            "end": 2101,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 868,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2098,
            "end": 2101,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 867,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2098,
            "end": 2101,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1356,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2102,
            "end": 2106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 870,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "take"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2102,
            "end": 2106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 869,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2102,
            "end": 2106,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1357,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2107,
            "end": 2108,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 871,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2107,
            "end": 2108,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1358,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2107,
            "end": 2113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 874,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2109,
            "end": 2113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 873,
          "framenet_id": "-",
          "is_verb": false,
          "predicate_lemma": "step"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2109,
            "end": 2113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 872,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2109,
            "end": 2113,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1359,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2114,
            "end": 2121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 876,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2114,
            "end": 2121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 875,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2114,
            "end": 2121,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1360,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2122,
            "end": 2123,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 878,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2122,
            "end": 2123,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1361,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2124,
            "end": 2127,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 880,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2124,
            "end": 2127,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 879,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2124,
            "end": 2127,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1362,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "PRP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2128,
            "end": 2131,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 882,
          "framenet_id": "03",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2128,
            "end": 2131,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 881,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2128,
            "end": 2131,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1363,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2132,
            "end": 2137,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 884,
          "framenet_id": "02",
          "is_verb": true,
          "predicate_lemma": "bind"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2132,
            "end": 2137,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 883,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2132,
            "end": 2137,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1364,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "IN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2138,
            "end": 2140,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 885,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2138,
            "end": 2140,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1365,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "TO",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2138,
            "end": 2159,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 893,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2141,
            "end": 2143,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 887,
          "framenet_id": "03",
          "is_verb": true,
          "predicate_lemma": "be"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2141,
            "end": 2143,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 886,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2141,
            "end": 2143,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1366,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2144,
            "end": 2150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 889,
          "framenet_id": "01",
          "is_verb": true,
          "predicate_lemma": "push"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2144,
            "end": 2150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 888,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "VBN",
          "sense": "1",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2144,
            "end": 2150,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1367,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "JJ",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2151,
            "end": 2154,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 891,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2151,
            "end": 2154,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 890,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2151,
            "end": 2154,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1368,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NN",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateArgument",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2155,
            "end": 2159,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 894,
          "is_verb": null,
          "ner_type": null,
          "predicate_lemma": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2155,
            "end": 2159,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 892,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2155,
            "end": 2159,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1369,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "RB",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2160,
            "end": 2161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 895,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2160,
            "end": 2161,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1370,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2162,
            "end": 2168,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 906,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2162,
            "end": 2168,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1371,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2162,
            "end": 2176,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 908,
          "ner_type": "PERSON"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2162,
            "end": 2212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 919,
          "part_id": 0,
          "sentiment": {},
          "speaker": "-"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Sentence",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2162,
            "end": 2212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 956,
          "part_id": null,
          "sentiment": {},
          "speaker": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2169,
            "end": 2176,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 907,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2169,
            "end": 2176,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1372,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2177,
            "end": 2178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 909,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2177,
            "end": 2178,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1373,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2179,
            "end": 2182,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 910,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2179,
            "end": 2182,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1374,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2179,
            "end": 2187,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 912,
          "ner_type": "ORG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2183,
            "end": 2187,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 911,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2183,
            "end": 2187,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1375,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2188,
            "end": 2189,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 913,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2188,
            "end": 2189,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1376,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ",",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2190,
            "end": 2193,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 914,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2190,
            "end": 2193,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1377,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "DT",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.EntityMention",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2190,
            "end": 2210,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 917,
          "ner_type": "FAC"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2194,
            "end": 2199,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 915,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2194,
            "end": 2199,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1378,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2200,
            "end": 2210,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 916,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2200,
            "end": 2210,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1379,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": "NNP",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2211,
            "end": 2212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 918,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": "-",
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      },
      {
        "py/object": "ft.onto.base_ontology.Token",
        "py/state": {
          "_embedding": [],
          "_span": {
            "begin": 2211,
            "end": 2212,
            "py/object": "forte.data.span.Span"
          },
          "_tid": 1380,
          "chunk": null,
          "is_root": null,
          "lemma": null,
          "ner": null,
          "pos": ".",
          "sense": null,
          "ud_features": {},
          "ud_misc": {},
          "ud_xpos": null
        }
      }
    ],
    "creation_records": {
      "forte.data.readers.ontonotes_reader.OntonotesReader": {
        "py/set": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107,
          108,
          109,
          110,
          111,
          112,
          113,
          114,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          123,
          124,
          125,
          126,
          127,
          128,
          129,
          130,
          131,
          132,
          133,
          134,
          135,
          136,
          137,
          138,
          139,
          140,
          141,
          142,
          143,
          144,
          145,
          146,
          147,
          148,
          149,
          150,
          151,
          152,
          153,
          154,
          155,
          156,
          157,
          158,
          159,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          174,
          175,
          176,
          177,
          178,
          179,
          180,
          181,
          182,
          183,
          184,
          185,
          186,
          187,
          188,
          189,
          190,
          191,
          192,
          193,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          210,
          211,
          212,
          213,
          214,
          215,
          216,
          217,
          218,
          219,
          220,
          221,
          222,
          223,
          224,
          225,
          226,
          227,
          228,
          229,
          230,
          231,
          232,
          233,
          234,
          235,
          236,
          237,
          238,
          239,
          240,
          241,
          242,
          243,
          244,
          245,
          246,
          247,
          248,
          249,
          250,
          251,
          252,
          253,
          254,
          255,
          256,
          257,
          258,
          259,
          260,
          261,
          262,
          263,
          264,
          265,
          266,
          267,
          268,
          269,
          270,
          271,
          272,
          273,
          274,
          275,
          276,
          277,
          278,
          279,
          280,
          281,
          282,
          283,
          284,
          285,
          286,
          287,
          288,
          289,
          290,
          291,
          292,
          293,
          294,
          295,
          296,
          297,
          298,
          299,
          300,
          301,
          302,
          303,
          304,
          305,
          306,
          307,
          308,
          309,
          310,
          311,
          312,
          313,
          314,
          315,
          316,
          317,
          318,
          319,
          320,
          321,
          322,
          323,
          324,
          325,
          326,
          327,
          328,
          329,
          330,
          331,
          332,
          333,
          334,
          335,
          336,
          337,
          338,
          339,
          340,
          341,
          342,
          343,
          344,
          345,
          346,
          347,
          348,
          349,
          350,
          351,
          352,
          353,
          354,
          355,
          356,
          357,
          358,
          359,
          360,
          361,
          362,
          363,
          364,
          365,
          366,
          367,
          368,
          369,
          370,
          371,
          372,
          373,
          374,
          375,
          376,
          377,
          378,
          379,
          380,
          381,
          382,
          383,
          384,
          385,
          386,
          387,
          388,
          389,
          390,
          391,
          392,
          393,
          394,
          395,
          396,
          397,
          398,
          399,
          400,
          401,
          402,
          403,
          404,
          405,
          406,
          407,
          408,
          409,
          410,
          411,
          412,
          413,
          414,
          415,
          416,
          417,
          418,
          419,
          420,
          421,
          422,
          423,
          424,
          425,
          426,
          427,
          428,
          429,
          430,
          431,
          432,
          433,
          434,
          435,
          436,
          437,
          438,
          439,
          440,
          441,
          442,
          443,
          444,
          445,
          446,
          447,
          448,
          449,
          450,
          451,
          452,
          453,
          454,
          455,
          456,
          457,
          458,
          459,
          460,
          461,
          462,
          463,
          464,
          465,
          466,
          467,
          468,
          469,
          470,
          471,
          472,
          473,
          474,
          475,
          476,
          477,
          478,
          479,
          480,
          481,
          482,
          483,
          484,
          485,
          486,
          487,
          488,
          489,
          490,
          491,
          492,
          493,
          494,
          495,
          496,
          497,
          498,
          499,
          500,
          501,
          502,
          503,
          504,
          505,
          506,
          507,
          508,
          509,
          510,
          511,
          512,
          513,
          514,
          515,
          516,
          517,
          518,
          519,
          520,
          521,
          522,
          523,
          524,
          525,
          526,
          527,
          528,
          529,
          530,
          531,
          532,
          533,
          534,
          535,
          536,
          537,
          538,
          539,
          540,
          541,
          542,
          543,
          544,
          545,
          546,
          547,
          548,
          549,
          550,
          551,
          552,
          553,
          554,
          555,
          556,
          557,
          558,
          559,
          560,
          561,
          562,
          563,
          564,
          565,
          566,
          567,
          568,
          569,
          570,
          571,
          572,
          573,
          574,
          575,
          576,
          577,
          578,
          579,
          580,
          581,
          582,
          583,
          584,
          585,
          586,
          587,
          588,
          589,
          590,
          591,
          592,
          593,
          594,
          595,
          596,
          597,
          598,
          599,
          600,
          601,
          602,
          603,
          604,
          605,
          606,
          607,
          608,
          609,
          610,
          611,
          612,
          613,
          614,
          615,
          616,
          617,
          618,
          619,
          620,
          621,
          622,
          623,
          624,
          625,
          626,
          627,
          628,
          629,
          630,
          631,
          632,
          633,
          634,
          635,
          636,
          637,
          638,
          639,
          640,
          641,
          642,
          643,
          644,
          645,
          646,
          647,
          648,
          649,
          650,
          651,
          652,
          653,
          654,
          655,
          656,
          657,
          658,
          659,
          660,
          661,
          662,
          663,
          664,
          665,
          666,
          667,
          668,
          669,
          670,
          671,
          672,
          673,
          674,
          675,
          676,
          677,
          678,
          679,
          680,
          681,
          682,
          683,
          684,
          685,
          686,
          687,
          688,
          689,
          690,
          691,
          692,
          693,
          694,
          695,
          696,
          697,
          698,
          699,
          700,
          701,
          702,
          703,
          704,
          705,
          706,
          707,
          708,
          709,
          710,
          711,
          712,
          713,
          714,
          715,
          716,
          717,
          718,
          719,
          720,
          721,
          722,
          723,
          724,
          725,
          726,
          727,
          728,
          729,
          730,
          731,
          732,
          733,
          734,
          735,
          736,
          737,
          738,
          739,
          740,
          741,
          742,
          743,
          744,
          745,
          746,
          747,
          748,
          749,
          750,
          751,
          752,
          753,
          754,
          755,
          756,
          757,
          758,
          759,
          760,
          761,
          762,
          763,
          764,
          765,
          766,
          767,
          768,
          769,
          770,
          771,
          772,
          773,
          774,
          775,
          776,
          777,
          778,
          779,
          780,
          781,
          782,
          783,
          784,
          785,
          786,
          787,
          788,
          789,
          790,
          791,
          792,
          793,
          794,
          795,
          796,
          797,
          798,
          799,
          800,
          801,
          802,
          803,
          804,
          805,
          806,
          807,
          808,
          809,
          810,
          811,
          812,
          813,
          814,
          815,
          816,
          817,
          818,
          819,
          820,
          821,
          822,
          823,
          824,
          825,
          826,
          827,
          828,
          829,
          830,
          831,
          832,
          833,
          834,
          835,
          836,
          837,
          838,
          839,
          840,
          841,
          842,
          843,
          844,
          845,
          846,
          847,
          848,
          849,
          850,
          851,
          852,
          853,
          854,
          855,
          856,
          857,
          858,
          859,
          860,
          861,
          862,
          863,
          864,
          865,
          866,
          867,
          868,
          869,
          870,
          871,
          872,
          873,
          874,
          875,
          876,
          877,
          878,
          879,
          880,
          881,
          882,
          883,
          884,
          885,
          886,
          887,
          888,
          889,
          890,
          891,
          892,
          893,
          894,
          895,
          896,
          897,
          898,
          899,
          900,
          901,
          902,
          903,
          904,
          905,
          906,
          907,
          908,
          909,
          910,
          911,
          912,
          913,
          914,
          915,
          916,
          917,
          918,
          919,
          920,
          921,
          922,
          923,
          924,
          925,
          926,
          927,
          928,
          929,
          930,
          931,
          932,
          933,
          934,
          935,
          936
        ]
      },
      "forte.processors.nltk_processors.NLTKPOSTagger": {
        "py/set": []
      },
      "forte.processors.nltk_processors.NLTKSentenceSegmenter": {
        "py/set": [
          937,
          938,
          939,
          940,
          941,
          942,
          943,
          944,
          945,
          946,
          947,
          948,
          949,
          950,
          951,
          952,
          953,
          954,
          955,
          956
        ]
      },
      "forte.processors.nltk_processors.NLTKWordTokenizer": {
        "py/set": [
          957,
          958,
          959,
          960,
          961,
          962,
          963,
          964,
          965,
          966,
          967,
          968,
          969,
          970,
          971,
          972,
          973,
          974,
          975,
          976,
          977,
          978,
          979,
          980,
          981,
          982,
          983,
          984,
          985,
          986,
          987,
          988,
          989,
          990,
          991,
          992,
          993,
          994,
          995,
          996,
          997,
          998,
          999,
          1000,
          1001,
          1002,
          1003,
          1004,
          1005,
          1006,
          1007,
          1008,
          1009,
          1010,
          1011,
          1012,
          1013,
          1014,
          1015,
          1016,
          1017,
          1018,
          1019,
          1020,
          1021,
          1022,
          1023,
          1024,
          1025,
          1026,
          1027,
          1028,
          1029,
          1030,
          1031,
          1032,
          1033,
          1034,
          1035,
          1036,
          1037,
          1038,
          1039,
          1040,
          1041,
          1042,
          1043,
          1044,
          1045,
          1046,
          1047,
          1048,
          1049,
          1050,
          1051,
          1052,
          1053,
          1054,
          1055,
          1056,
          1057,
          1058,
          1059,
          1060,
          1061,
          1062,
          1063,
          1064,
          1065,
          1066,
          1067,
          1068,
          1069,
          1070,
          1071,
          1072,
          1073,
          1074,
          1075,
          1076,
          1077,
          1078,
          1079,
          1080,
          1081,
          1082,
          1083,
          1084,
          1085,
          1086,
          1087,
          1088,
          1089,
          1090,
          1091,
          1092,
          1093,
          1094,
          1095,
          1096,
          1097,
          1098,
          1099,
          1100,
          1101,
          1102,
          1103,
          1104,
          1105,
          1106,
          1107,
          1108,
          1109,
          1110,
          1111,
          1112,
          1113,
          1114,
          1115,
          1116,
          1117,
          1118,
          1119,
          1120,
          1121,
          1122,
          1123,
          1124,
          1125,
          1126,
          1127,
          1128,
          1129,
          1130,
          1131,
          1132,
          1133,
          1134,
          1135,
          1136,
          1137,
          1138,
          1139,
          1140,
          1141,
          1142,
          1143,
          1144,
          1145,
          1146,
          1147,
          1148,
          1149,
          1150,
          1151,
          1152,
          1153,
          1154,
          1155,
          1156,
          1157,
          1158,
          1159,
          1160,
          1161,
          1162,
          1163,
          1164,
          1165,
          1166,
          1167,
          1168,
          1169,
          1170,
          1171,
          1172,
          1173,
          1174,
          1175,
          1176,
          1177,
          1178,
          1179,
          1180,
          1181,
          1182,
          1183,
          1184,
          1185,
          1186,
          1187,
          1188,
          1189,
          1190,
          1191,
          1192,
          1193,
          1194,
          1195,
          1196,
          1197,
          1198,
          1199,
          1200,
          1201,
          1202,
          1203,
          1204,
          1205,
          1206,
          1207,
          1208,
          1209,
          1210,
          1211,
          1212,
          1213,
          1214,
          1215,
          1216,
          1217,
          1218,
          1219,
          1220,
          1221,
          1222,
          1223,
          1224,
          1225,
          1226,
          1227,
          1228,
          1229,
          1230,
          1231,
          1232,
          1233,
          1234,
          1235,
          1236,
          1237,
          1238,
          1239,
          1240,
          1241,
          1242,
          1243,
          1244,
          1245,
          1246,
          1247,
          1248,
          1249,
          1250,
          1251,
          1252,
          1253,
          1254,
          1255,
          1256,
          1257,
          1258,
          1259,
          1260,
          1261,
          1262,
          1263,
          1264,
          1265,
          1266,
          1267,
          1268,
          1269,
          1270,
          1271,
          1272,
          1273,
          1274,
          1275,
          1276,
          1277,
          1278,
          1279,
          1280,
          1281,
          1282,
          1283,
          1284,
          1285,
          1286,
          1287,
          1288,
          1289,
          1290,
          1291,
          1292,
          1293,
          1294,
          1295,
          1296,
          1297,
          1298,
          1299,
          1300,
          1301,
          1302,
          1303,
          1304,
          1305,
          1306,
          1307,
          1308,
          1309,
          1310,
          1311,
          1312,
          1313,
          1314,
          1315,
          1316,
          1317,
          1318,
          1319,
          1320,
          1321,
          1322,
          1323,
          1324,
          1325,
          1326,
          1327,
          1328,
          1329,
          1330,
          1331,
          1332,
          1333,
          1334,
          1335,
          1336,
          1337,
          1338,
          1339,
          1340,
          1341,
          1342,
          1343,
          1344,
          1345,
          1346,
          1347,
          1348,
          1349,
          1350,
          1351,
          1352,
          1353,
          1354,
          1355,
          1356,
          1357,
          1358,
          1359,
          1360,
          1361,
          1362,
          1363,
          1364,
          1365,
          1366,
          1367,
          1368,
          1369,
          1370,
          1371,
          1372,
          1373,
          1374,
          1375,
          1376,
          1377,
          1378,
          1379,
          1380
        ]
      }
    },
    "field_records": {
      "forte.data.readers.ontonotes_reader.OntonotesReader": {
        "py/set": [
          {
            "py/tuple": [
              495,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              26,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              564,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              41,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              510,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              274,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              1,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              362,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              377,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              205,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              816,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              700,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              789,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              786,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              557,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              4,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              98,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              208,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              311,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              449,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              50,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              599,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              522,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              66,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              303,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              613,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              62,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              401,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              171,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              178,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              693,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              122,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              321,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              258,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              502,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              919,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              728,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              305,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              452,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              278,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              661,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              658,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              29,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              482,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              773,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              65,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              454,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              202,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              579,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              814,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              448,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              839,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              562,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              27,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              699,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              643,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              233,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              53,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              506,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              620,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              141,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              392,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              165,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              673,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              445,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              895,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              298,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              725,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              501,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              888,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              30,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              228,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              855,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              0,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              469,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              109,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              561,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              916,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              336,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              762,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              883,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              31,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              889,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              864,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              101,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              557,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              892,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              24,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              156,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              842,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              689,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              300,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              675,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              734,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              572,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              472,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              214,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              262,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              406,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              706,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              688,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              540,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              243,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              440,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              268,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              374,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              625,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              49,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              596,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              130,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              582,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              759,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              184,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              44,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              108,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              497,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              187,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              483,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              12,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              559,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              355,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              267,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              504,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              844,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              15,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              237,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              895,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              732,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              770,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              115,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              263,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              351,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              430,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              701,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              591,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              56,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              730,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              372,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              95,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              749,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              781,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              484,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              610,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              710,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              757,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              655,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              245,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              255,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              452,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              783,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              690,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              572,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              751,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              857,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              483,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              173,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              437,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              306,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              853,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              445,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              54,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              589,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              4,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              573,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              575,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              445,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              789,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              910,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              134,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              711,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              0,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              872,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              277,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              34,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              917,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              662,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              859,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              724,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              783,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              241,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              518,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              320,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              870,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              293,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              742,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              368,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              659,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              3,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              316,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              830,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              27,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              266,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              645,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              822,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              251,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              337,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              448,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              542,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              531,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              674,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              482,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              484,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              766,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              878,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              51,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              867,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              504,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              240,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              204,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              398,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              846,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              151,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              131,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              295,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              66,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              713,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              172,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              290,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              543,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              485,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              606,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              264,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              793,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              633,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              694,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              238,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              435,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              724,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              350,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              76,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              331,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              567,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              105,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              871,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              318,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              440,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              514,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              468,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              38,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              378,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              205,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              700,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              538,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              720,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              39,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              492,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              434,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              7,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              538,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              795,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              762,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              883,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              242,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              338,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              343,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              847,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              297,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              107,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              363,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              600,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              721,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              842,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              553,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              912,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              501,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              765,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              725,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              813,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              218,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              823,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              223,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              384,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              679,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              545,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              447,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              253,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              767,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              346,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              85,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              846,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              299,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              468,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              117,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              169,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              333,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              865,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              426,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              412,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              215,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              539,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              884,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              829,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              165,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              524,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              598,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              197,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              671,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              726,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              909,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              625,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              122,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              550,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              810,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              208,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              252,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              715,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              202,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              579,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              776,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              208,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              109,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              84,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              886,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              77,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              230,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              483,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              259,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              88,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              369,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              321,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              819,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              721,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              168,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              377,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              833,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              22,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              475,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              11,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              278,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              507,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              99,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              246,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              443,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              913,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              358,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              736,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              38,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              56,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              619,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              46,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              702,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              434,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              113,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              174,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              857,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              587,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              438,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              564,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              682,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              488,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              825,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              193,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              510,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              740,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              386,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              123,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              454,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              369,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              739,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              599,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              820,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              546,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              249,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              591,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              601,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              788,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              217,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              234,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              430,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              415,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              329,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              731,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              473,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              681,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              367,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              563,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              409,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              242,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              584,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              826,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              547,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              864,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              757,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              733,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              680,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              564,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              805,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              845,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              546,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              487,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              10,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              783,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              181,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              406,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              856,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              10,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              354,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              581,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              125,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              322,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              438,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              869,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              464,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              437,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              270,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              288,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              850,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              380,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              234,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              474,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              736,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              630,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              243,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              164,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              246,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              232,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              164,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              285,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              621,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              697,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              458,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              226,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              271,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              552,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              58,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              126,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              567,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              188,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              307,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              96,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              237,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              804,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              551,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              397,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              40,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              639,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              611,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              462,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              111,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              723,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              469,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              554,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              458,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              726,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              691,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              698,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              688,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              120,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              826,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              232,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              431,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              828,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              686,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              631,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              50,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              574,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              287,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              771,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              778,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              660,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              765,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              865,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              312,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              269,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              550,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              164,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              83,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              169,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              280,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              638,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              36,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              539,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              394,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              716,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              163,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              618,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              631,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              273,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              828,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              126,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              843,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              873,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              796,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              124,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              183,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              705,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              887,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              679,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              108,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              497,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              44,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              415,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              379,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              329,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              413,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              526,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              96,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              712,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              77,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              188,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              325,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              750,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              404,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              207,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              703,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              850,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              268,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              244,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              45,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              309,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              285,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              248,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              899,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              682,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              523,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              496,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              324,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              356,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              536,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              630,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              7,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              244,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              650,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              183,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              207,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              310,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              404,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              653,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              774,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              95,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              757,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              322,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              324,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              125,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              741,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              172,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              336,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              380,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              887,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              871,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              68,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              889,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              189,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              697,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              473,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              157,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              459,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              429,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              686,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              731,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              826,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              280,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              240,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              858,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              789,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              779,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              606,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              634,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              123,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              320,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              558,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              385,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              662,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              612,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              61,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              476,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              638,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              79,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              203,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              40,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              129,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              547,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              481,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              742,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              447,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              723,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              356,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              171,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              178,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              135,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              630,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              687,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              915,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              200,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              901,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              54,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              507,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              227,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              140,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              148,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              331,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              553,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              134,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              786,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              110,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              611,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              885,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              2,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              63,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              179,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              543,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              78,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              133,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              275,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              663,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              190,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              607,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              177,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              9,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              158,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              547,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              610,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              270,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              252,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              55,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              711,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              97,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              234,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              25,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              791,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              911,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              815,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              109,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              690,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              486,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              17,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              332,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              352,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              318,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              361,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              530,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              634,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              331,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              770,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              50,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              215,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              412,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              432,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              672,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              765,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              541,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              714,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              85,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              70,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              133,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              263,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              706,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              657,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              794,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              239,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              16,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              64,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              217,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              130,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              337,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              875,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              347,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              820,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              590,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              186,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              399,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              542,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              512,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              152,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              317,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              782,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              609,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              296,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              69,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              266,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              848,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              568,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              884,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              200,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              536,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              668,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              740,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              373,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              530,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              633,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              648,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              356,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              606,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              467,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              205,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              726,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              872,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              583,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              602,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              453,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              405,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              774,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              802,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              425,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              605,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              313,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              890,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              88,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              398,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              593,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              391,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              114,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              685,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              561,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              543,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              168,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              673,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              166,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              669,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              850,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              908,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              183,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              157,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              344,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              86,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              203,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              728,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              167,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              33,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              528,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              902,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              255,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              424,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              776,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              65,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              779,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              29,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              889,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              366,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              33,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              117,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              502,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              695,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              775,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              86,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              823,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              444,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              446,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              247,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              312,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              433,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              831,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              197,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              660,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              154,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              429,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              166,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              449,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              254,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              311,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              636,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              529,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              261,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              28,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              767,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              675,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              658,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              40,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              605,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              802,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              585,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              441,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              847,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              573,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              685,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              132,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              114,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              593,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              35,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              80,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              818,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              653,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              696,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              194,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              407,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              840,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              273,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              340,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              436,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              756,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              274,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              732,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              512,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              289,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              831,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              734,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              45,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              647,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              46,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              848,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              544,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              793,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              182,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              101,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              777,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              493,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              441,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              132,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              701,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              683,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              594,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              124,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              498,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              105,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              181,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              748,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              317,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              763,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              147,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              751,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              875,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              291,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              790,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              261,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              80,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              863,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              854,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              51,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              80,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              409,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              843,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              511,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              763,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              16,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              485,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              563,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              752,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              713,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              128,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              102,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              792,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              595,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              716,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              531,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              131,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              352,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              643,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              827,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              791,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              383,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              867,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              659,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              249,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              235,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              432,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              879,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              213,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              907,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              632,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              728,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              882,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              424,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              401,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              277,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              830,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              3,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              222,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              250,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              371,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              821,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              407,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              910,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              892,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              339,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              89,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              551,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              177,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              339,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              257,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              622,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              434,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              855,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              28,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              809,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              599,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              481,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              575,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              144,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              422,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              140,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              718,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              380,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              558,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              648,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              256,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              400,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              655,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              84,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              149,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              473,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              879,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              247,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              636,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              444,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              730,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              414,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              119,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              378,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              69,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              437,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              896,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              520,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              746,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              276,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              849,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              667,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              199,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              567,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              614,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              811,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              905,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              145,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              629,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              15,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              845,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              383,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              727,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              258,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              95,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              142,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              346,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              704,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              906,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              286,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              351,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              276,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              236,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              807,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              189,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              729,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              218,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              636,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              511,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              764,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              98,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              714,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              596,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              571,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              600,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              361,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              491,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              472,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              460,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              436,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              113,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              192,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              237,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              732,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              146,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              158,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              758,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              24,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              496,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              272,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              838,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              11,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              379,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              658,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              705,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              918,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              347,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              888,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              435,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              238,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              635,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              112,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              222,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              230,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              221,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              882,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              729,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              506,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              594,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              60,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              817,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              30,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              675,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              97,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              416,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              269,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              612,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              541,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              254,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              126,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              878,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              366,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              629,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              527,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              233,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              861,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              446,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              711,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              904,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              693,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              754,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              201,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              55,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              882,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              310,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              773,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              819,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              834,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              23,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              150,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              747,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              717,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              914,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              294,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              890,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              835,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              2,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              525,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              94,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              367,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              321,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              613,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              797,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              226,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              439,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              463,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              393,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              338,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              760,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              838,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              539,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              129,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              812,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              741,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              373,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              853,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              26,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              700,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              495,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              465,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              608,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              68,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              821,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              153,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              250,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              371,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              453,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              492,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              650,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              715,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              720,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              362,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              330,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              41,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              354,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              245,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              609,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              399,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              724,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              737,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              395,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              632,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              87,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              854,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              703,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              213,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              76,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              372,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              301,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              325,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              712,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              805,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              13,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              18,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              378,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              870,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              580,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              56,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              357,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              609,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              10,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              239,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              595,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              792,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              242,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              487,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              353,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              388,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              104,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              738,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              559,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              831,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              216,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              169,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              276,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              737,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              184,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              849,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              369,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              624,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              67,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              368,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              777,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              608,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              97,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              670,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              574,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              342,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              278,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              241,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              844,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              443,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              166,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              179,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              686,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              275,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              422,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              823,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              756,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              22,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              833,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              179,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              797,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              799,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              110,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              566,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              639,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              9,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              358,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              913,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              224,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              269,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              607,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              190,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              304,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              558,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              804,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              431,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              916,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              262,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              886,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              834,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              170,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              915,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              687,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              173,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              666,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              799,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              832,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              914,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              717,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              227,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              796,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              431,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              494,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              861,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              143,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              829,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              586,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              781,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              53,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              450,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              235,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              390,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              754,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              67,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              909,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              340,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              302,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              253,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              450,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              221,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              647,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              752,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              262,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              661,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              873,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              333,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              104,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              466,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              635,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              832,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              344,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              688,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              897,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              588,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              68,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              494,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              124,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              317,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              357,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              343,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              408,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              37,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              396,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              112,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              795,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              224,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              49,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              59,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              854,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              566,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              192,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              405,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              739,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              222,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              519,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              107,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              533,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              367,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              425,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              919,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              348,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              330,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              292,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              425,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              272,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              248,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              514,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              494,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              342,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              702,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              568,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              689,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              39,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              571,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              532,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              99,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              491,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              71,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              782,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              764,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              408,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              454,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              406,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              186,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              94,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              733,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              259,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              326,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              727,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              353,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              633,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              200,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              337,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              794,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              225,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              807,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              236,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              433,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              251,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              743,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              822,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              201,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              562,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              775,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              204,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              83,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              119,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              316,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              774,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              313,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              805,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              87,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              163,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              308,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              618,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              199,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              426,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              77,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              859,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              193,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              521,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              167,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              120,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              511,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              691,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              698,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              911,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              25,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              129,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              666,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              111,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              870,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              808,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              257,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              771,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              778,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              844,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              223,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              518,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              78,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              475,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              439,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              873,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              885,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              58,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              271,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              387,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              170,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              313,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              644,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              590,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              884,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              23,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              474,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              552,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              903,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              626,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              85,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              898,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              461,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              827,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              905,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              856,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              598,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              841,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              710,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              128,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              907,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              441,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              350,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              216,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              155,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              869,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              678,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              790,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              416,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              881,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              340,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              545,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              187,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              273,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              672,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              900,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              657,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              102,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              715,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              115,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              759,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              906,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              881,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              70,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              267,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              601,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              788,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              182,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              678,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              46,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              12,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              544,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              777,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              918,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              862,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              766,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              681,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              64,
              "_part_id"
            ]
          },
          {
            "py/tuple": [
              172,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              540,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              706,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              735,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              746,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              17,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              332,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              486,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              887,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              825,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              493,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              214,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              594,
              "_predicate_lemma"
            ]
          },
          {
            "py/tuple": [
              401,
              "_is_verb"
            ]
          },
          {
            "py/tuple": [
              417,
              "_ner_type"
            ]
          },
          {
            "py/tuple": [
              389,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              532,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              758,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              174,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              623,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              194,
              "_sense"
            ]
          },
          {
            "py/tuple": [
              626,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              646,
              "_arg_type"
            ]
          },
          {
            "py/tuple": [
              841,
              "_speaker"
            ]
          },
          {
            "py/tuple": [
              115,
              "_framenet_id"
            ]
          },
          {
            "py/tuple": [
              133,
              "_predicate_lemma"
            ]
          }
        ]
      },
      "forte.processors.nltk_processors.NLTKPOSTagger": {
        "py/set": [
          {
            "py/tuple": [
              1131,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              226,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1328,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              439,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1363,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              970,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              833,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              536,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              22,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1165,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              475,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              338,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              41,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              510,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              373,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1201,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              648,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1236,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1099,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1296,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              741,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1272,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1151,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              246,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1348,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              443,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1246,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              853,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              26,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              913,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              872,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              495,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              358,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              377,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              453,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1084,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1281,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              984,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1119,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1316,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1179,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              786,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              608,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              821,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              250,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              113,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1352,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1231,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              857,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              720,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1052,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              362,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              438,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              557,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              4,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1010,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1088,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1301,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1164,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1123,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              593,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1199,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              98,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              825,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              311,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1235,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              330,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              193,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1311,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1037,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              740,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1056,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              245,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              561,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1108,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              66,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1168,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              613,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1203,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1066,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              673,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              632,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1005,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              178,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1118,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              213,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1315,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1373,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              820,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              546,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              249,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1271,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              325,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              344,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              86,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              973,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1188,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1051,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1086,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              693,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1283,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              122,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1009,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              712,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              591,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1341,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              788,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              258,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              217,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              430,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1377,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1275,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              329,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1351,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              661,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              977,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              424,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1071,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              29,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              482,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1166,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              773,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1148,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              595,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              202,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              65,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              792,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1260,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1039,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1355,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              962,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              409,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              997,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1075,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              33,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              502,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1228,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              104,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              733,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1264,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1143,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1340,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1043,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              216,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1375,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              982,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              845,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              487,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              53,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1155,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              506,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1213,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              660,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              976,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1111,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              165,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1308,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1011,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              737,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              184,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1147,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1344,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1223,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1379,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1242,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              849,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              354,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1038,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              449,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1293,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              996,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1115,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1312,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1191,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              501,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              67,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              125,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1364,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1227,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              322,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1262,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              869,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1322,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              888,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              767,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              964,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              0,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1374,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              469,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1100,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1000,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1135,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              605,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1195,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              802,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1247,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              342,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1307,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1129,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              736,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1342,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              241,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              968,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              847,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              573,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              336,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1180,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              883,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1215,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1078,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              685,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              132,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              114,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1251,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1114,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1327,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              422,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              285,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              756,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              458,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              24,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              653,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1184,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1063,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              963,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1082,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              689,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1295,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1158,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1021,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              194,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              407,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1134,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1331,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1194,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              639,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              9,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1031,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              734,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              989,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              436,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1067,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1102,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              572,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1299,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1162,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              472,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              607,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              214,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              804,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              274,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              96,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1214,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              916,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1035,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1367,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              540,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              243,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              993,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              440,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1087,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              45,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1182,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              611,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              687,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1003,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1294,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1276,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              723,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              799,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1371,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1234,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              544,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              49,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1167,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1030,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              596,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1049,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              101,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              988,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              691,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              120,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1023,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              493,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1356,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              232,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1254,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              861,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              759,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1171,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1034,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              992,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1127,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              574,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              181,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              44,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              771,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              497,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              829,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1239,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1258,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              865,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              312,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1334,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              763,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              960,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1054,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              12,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1370,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              559,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1012,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              875,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1207,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              261,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              83,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              280,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              909,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1243,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1106,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1319,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1278,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1141,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1338,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              253,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              980,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              843,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              450,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              16,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              485,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              563,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1016,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              895,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1211,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1074,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              128,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1287,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              990,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              716,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              163,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1263,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1126,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              221,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1323,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1145,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              752,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              631,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1358,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1221,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              828,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              531,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              333,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1257,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              352,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              643,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              975,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1094,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              701,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1291,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1154,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              796,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1130,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1343,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1206,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              635,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1225,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              832,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              867,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              730,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              372,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              235,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              432,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1079,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              979,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1098,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1174,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              781,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              484,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              679,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1150,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              108,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1210,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1286,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1305,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1047,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              357,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              255,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              452,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1083,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1159,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1178,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1041,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              112,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1015,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1230,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1093,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              188,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1290,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1112,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              795,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              224,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              830,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              3,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1163,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1026,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1198,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1061,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              371,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              703,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              566,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              173,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1019,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1097,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              192,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1310,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              405,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              268,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              739,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1192,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              244,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              107,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1250,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              910,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              892,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              339,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1046,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1362,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1065,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              551,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1004,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              177,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1177,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              272,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              682,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              248,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1270,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1133,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              324,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1330,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              972,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1050,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1008,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              650,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              257,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1255,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              702,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1274,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1137,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              207,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1350,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              957,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              404,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              855,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1070,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              28,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              481,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              575,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1028,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              967,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              277,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              140,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              99,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              986,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1064,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              491,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1122,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1335,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              782,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              764,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1354,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1217,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              408,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              859,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1269,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1032,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              655,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              518,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              84,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              971,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1090,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1303,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1006,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1142,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1339,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1202,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              94,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1237,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1297,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              879,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              742,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1273,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              368,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              247,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1349,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              444,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              659,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1368,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              991,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1110,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              27,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1170,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              259,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1146,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1222,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1282,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1241,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1104,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              727,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1317,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              746,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              353,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              959,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              822,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              429,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              251,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1353,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              448,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              542,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              995,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1190,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1053,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1226,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1089,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1302,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1124,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              731,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1321,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              807,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              766,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              629,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              236,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              433,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              15,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1175,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              878,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              51,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1057,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              504,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              383,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              562,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              775,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1109,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              204,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1306,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1169,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1128,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1204,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              240,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              119,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              846,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              316,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              906,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1240,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              351,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1042,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              958,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1077,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              131,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              189,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              779,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1113,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              87,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1326,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1189,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              618,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1208,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1284,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              123,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1266,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              713,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              320,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              199,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              218,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1320,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1062,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1378,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1081,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1157,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1020,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              662,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              978,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1193,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              167,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              638,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1091,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              698,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1288,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              911,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1149,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              203,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1346,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              793,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              238,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              435,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1261,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              571,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1161,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1024,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              350,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              76,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              666,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              111,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              998,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1076,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              171,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              915,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              778,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              600,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              223,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1366,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1229,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              105,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              871,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              318,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1265,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1044,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              514,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1360,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              983,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1002,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1080,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              54,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1156,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              507,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1138,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              227,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1233,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1309,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1029,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1345,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1048,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1380,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              987,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              553,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              39,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1022,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              885,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              492,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              58,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1160,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              271,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              134,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1218,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              110,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1253,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1116,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              170,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1313,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              758,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1033,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              7,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1365,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              538,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1007,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1186,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              496,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              78,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              965,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              275,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1238,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1101,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1298,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1001,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1120,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              190,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1333,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1196,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              762,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              838,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              11,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1369,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1232,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              343,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1267,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1069,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              379,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              969,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              158,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              474,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1105,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              552,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1318,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1181,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1140,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              610,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1337,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1200,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              270,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              252,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              842,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              705,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              918,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1252,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              347,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1347,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1073,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              25,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              791,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1125,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1185,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1144,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1220,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              827,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              690,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1280,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              725,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              332,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1256,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              230,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1332,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1058,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              974,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1153,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              856,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              598,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              361,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1205,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1068,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              634,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1224,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1103,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              710,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1300,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              907,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              770,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              729,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              215,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              412,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1139,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1336,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              447,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              30,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1173,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1036,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              346,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              678,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              541,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              994,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1209,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1072,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1285,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1107,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              714,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1304,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1183,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              790,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              612,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              416,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              254,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              117,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1219,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1277,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1040,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              366,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1372,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              426,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              545,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1014,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1092,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              187,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1289,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1152,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              263,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1187,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              794,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              657,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              239,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              102,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1245,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              197,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1025,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1357,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1060,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              233,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1376,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              999,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              446,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1018,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              881,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1096,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              70,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1172,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              267,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              130,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              601,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1249,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              182,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1325,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              754,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              201,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1045,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1361,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              550,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1259,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              55,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              961,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1176,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1055,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              681,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1013,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1132,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              579,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              186,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1329,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              776,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              399,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              834,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              23,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1244,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1279,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              886,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              512,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              981,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1059,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              17,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              486,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1117,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1314,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1017,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1136,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              69,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1212,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              266,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              88,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              717,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              914,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1248,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1324,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1027,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              890,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1359,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              966,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1085,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              532,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              2,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              985,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              848,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              174,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1121,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              568,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1197,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              626,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1216,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1095,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1292,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              721,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              168,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              797,
              "_pos"
            ]
          },
          {
            "py/tuple": [
              1268,
              "_pos"
            ]
          }
        ]
      }
    },
    "generics": [],
    "groups": [
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              549,
              6
            ]
          },
          "_tid": 920
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              480,
              513,
              14
            ]
          },
          "_tid": 921
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              43,
              20
            ]
          },
          "_tid": 922
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              769,
              451,
              421,
              745,
              628,
              21,
              761,
              471,
              665,
              604
            ]
          },
          "_tid": 923
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              121,
              75,
              118
            ]
          },
          "_tid": 924
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              82,
              403,
              677
            ]
          },
          "_tid": 925
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              837,
              93,
              852
            ]
          },
          "_tid": 926
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              162,
              196
            ]
          },
          "_tid": 927
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              176,
              642,
              220
            ]
          },
          "_tid": 928
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              315,
              335
            ]
          },
          "_tid": 929
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              328,
              345
            ]
          },
          "_tid": 930
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              556,
              365,
              503
            ]
          },
          "_tid": 931
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              708,
              490,
              500,
              535,
              376,
              570,
              509
            ]
          },
          "_tid": 932
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              411,
              428
            ]
          },
          "_tid": 933
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              652,
              637
            ]
          },
          "_tid": 934
        }
      },
      {
        "py/object": "ft.onto.base_ontology.CoreferenceGroup",
        "py/state": {
          "_embedding": [],
          "_members": {
            "py/set": [
              785,
              709,
              801
            ]
          },
          "_tid": 935
        }
      }
    ],
    "links": [
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 5,
          "_embedding": [],
          "_parent": 10,
          "_tid": 34,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 8,
          "_embedding": [],
          "_parent": 10,
          "_tid": 35,
          "arg_type": "ARGM-MOD"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 19,
          "_embedding": [],
          "_parent": 10,
          "_tid": 36,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 32,
          "_embedding": [],
          "_parent": 10,
          "_tid": 37,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 47,
          "_embedding": [],
          "_parent": 40,
          "_tid": 59,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 42,
          "_embedding": [],
          "_parent": 46,
          "_tid": 60,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 48,
          "_embedding": [],
          "_parent": 50,
          "_tid": 61,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 52,
          "_embedding": [],
          "_parent": 50,
          "_tid": 62,
          "arg_type": "ARGM-NEG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 57,
          "_embedding": [],
          "_parent": 50,
          "_tid": 63,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 72,
          "_embedding": [],
          "_parent": 77,
          "_tid": 141,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 81,
          "_embedding": [],
          "_parent": 77,
          "_tid": 142,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 90,
          "_embedding": [],
          "_parent": 77,
          "_tid": 143,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 73,
          "_embedding": [],
          "_parent": 85,
          "_tid": 144,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 91,
          "_embedding": [],
          "_parent": 85,
          "_tid": 145,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 92,
          "_embedding": [],
          "_parent": 95,
          "_tid": 146,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 136,
          "_embedding": [],
          "_parent": 95,
          "_tid": 147,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 74,
          "_embedding": [],
          "_parent": 97,
          "_tid": 148,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 100,
          "_embedding": [],
          "_parent": 97,
          "_tid": 149,
          "arg_type": "ARG4"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 137,
          "_embedding": [],
          "_parent": 97,
          "_tid": 150,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 103,
          "_embedding": [],
          "_parent": 109,
          "_tid": 151,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 106,
          "_embedding": [],
          "_parent": 109,
          "_tid": 152,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 138,
          "_embedding": [],
          "_parent": 109,
          "_tid": 153,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 116,
          "_embedding": [],
          "_parent": 129,
          "_tid": 154,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 127,
          "_embedding": [],
          "_parent": 129,
          "_tid": 155,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 139,
          "_embedding": [],
          "_parent": 129,
          "_tid": 156,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 159,
          "_embedding": [],
          "_parent": 169,
          "_tid": 286,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 209,
          "_embedding": [],
          "_parent": 169,
          "_tid": 287,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 160,
          "_embedding": [],
          "_parent": 172,
          "_tid": 288,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 175,
          "_embedding": [],
          "_parent": 172,
          "_tid": 289,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 210,
          "_embedding": [],
          "_parent": 172,
          "_tid": 290,
          "arg_type": "ARGM-PRP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 161,
          "_embedding": [],
          "_parent": 183,
          "_tid": 291,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 180,
          "_embedding": [],
          "_parent": 183,
          "_tid": 292,
          "arg_type": "ARGM-LVB"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 185,
          "_embedding": [],
          "_parent": 183,
          "_tid": 293,
          "arg_type": "ARGM-DIR"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 191,
          "_embedding": [],
          "_parent": 183,
          "_tid": 294,
          "arg_type": "ARGM-PRP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 211,
          "_embedding": [],
          "_parent": 183,
          "_tid": 295,
          "arg_type": "ARGM-PRP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 195,
          "_embedding": [],
          "_parent": 200,
          "_tid": 296,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 198,
          "_embedding": [],
          "_parent": 200,
          "_tid": 297,
          "arg_type": "ARGM-MOD"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 212,
          "_embedding": [],
          "_parent": 200,
          "_tid": 298,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 206,
          "_embedding": [],
          "_parent": 208,
          "_tid": 299,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 219,
          "_embedding": [],
          "_parent": 222,
          "_tid": 300,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 231,
          "_embedding": [],
          "_parent": 234,
          "_tid": 301,
          "arg_type": "ARGM-MOD"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 229,
          "_embedding": [],
          "_parent": 237,
          "_tid": 302,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 281,
          "_embedding": [],
          "_parent": 237,
          "_tid": 303,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 260,
          "_embedding": [],
          "_parent": 262,
          "_tid": 304,
          "arg_type": "ARGM-MOD"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 265,
          "_embedding": [],
          "_parent": 262,
          "_tid": 305,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 282,
          "_embedding": [],
          "_parent": 262,
          "_tid": 306,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 283,
          "_embedding": [],
          "_parent": 269,
          "_tid": 307,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 279,
          "_embedding": [],
          "_parent": 276,
          "_tid": 308,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 284,
          "_embedding": [],
          "_parent": 276,
          "_tid": 309,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 314,
          "_embedding": [],
          "_parent": 321,
          "_tid": 384,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 319,
          "_embedding": [],
          "_parent": 321,
          "_tid": 385,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 323,
          "_embedding": [],
          "_parent": 321,
          "_tid": 386,
          "arg_type": "ARGM-DIR"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 327,
          "_embedding": [],
          "_parent": 321,
          "_tid": 387,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 341,
          "_embedding": [],
          "_parent": 321,
          "_tid": 388,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 349,
          "_embedding": [],
          "_parent": 321,
          "_tid": 389,
          "arg_type": "C-ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 381,
          "_embedding": [],
          "_parent": 321,
          "_tid": 390,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 334,
          "_embedding": [],
          "_parent": 337,
          "_tid": 391,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 359,
          "_embedding": [],
          "_parent": 367,
          "_tid": 392,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 364,
          "_embedding": [],
          "_parent": 367,
          "_tid": 393,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 370,
          "_embedding": [],
          "_parent": 367,
          "_tid": 394,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 360,
          "_embedding": [],
          "_parent": 378,
          "_tid": 395,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 375,
          "_embedding": [],
          "_parent": 378,
          "_tid": 396,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 382,
          "_embedding": [],
          "_parent": 378,
          "_tid": 397,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 402,
          "_embedding": [],
          "_parent": 406,
          "_tid": 413,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 410,
          "_embedding": [],
          "_parent": 406,
          "_tid": 414,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 418,
          "_embedding": [],
          "_parent": 425,
          "_tid": 459,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 423,
          "_embedding": [],
          "_parent": 425,
          "_tid": 460,
          "arg_type": "ARGM-MNR"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 427,
          "_embedding": [],
          "_parent": 425,
          "_tid": 461,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 455,
          "_embedding": [],
          "_parent": 425,
          "_tid": 462,
          "arg_type": "ARGM-PRP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 419,
          "_embedding": [],
          "_parent": 434,
          "_tid": 463,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 442,
          "_embedding": [],
          "_parent": 434,
          "_tid": 464,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 456,
          "_embedding": [],
          "_parent": 434,
          "_tid": 465,
          "arg_type": "ARGM-MNR"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 420,
          "_embedding": [],
          "_parent": 445,
          "_tid": 466,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 457,
          "_embedding": [],
          "_parent": 445,
          "_tid": 467,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 470,
          "_embedding": [],
          "_parent": 473,
          "_tid": 519,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 477,
          "_embedding": [],
          "_parent": 473,
          "_tid": 520,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 515,
          "_embedding": [],
          "_parent": 473,
          "_tid": 521,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 478,
          "_embedding": [],
          "_parent": 483,
          "_tid": 522,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 489,
          "_embedding": [],
          "_parent": 483,
          "_tid": 523,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 479,
          "_embedding": [],
          "_parent": 494,
          "_tid": 524,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 499,
          "_embedding": [],
          "_parent": 494,
          "_tid": 525,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 505,
          "_embedding": [],
          "_parent": 494,
          "_tid": 526,
          "arg_type": "ARGM-MNR"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 516,
          "_embedding": [],
          "_parent": 494,
          "_tid": 527,
          "arg_type": "ARGM-CAU"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 508,
          "_embedding": [],
          "_parent": 511,
          "_tid": 528,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 517,
          "_embedding": [],
          "_parent": 511,
          "_tid": 529,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 534,
          "_embedding": [],
          "_parent": 539,
          "_tid": 580,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 537,
          "_embedding": [],
          "_parent": 539,
          "_tid": 581,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 548,
          "_embedding": [],
          "_parent": 539,
          "_tid": 582,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 576,
          "_embedding": [],
          "_parent": 539,
          "_tid": 583,
          "arg_type": "ARGM-CAU"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 555,
          "_embedding": [],
          "_parent": 558,
          "_tid": 584,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 560,
          "_embedding": [],
          "_parent": 558,
          "_tid": 585,
          "arg_type": "ARGM-NEG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 577,
          "_embedding": [],
          "_parent": 558,
          "_tid": 586,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 565,
          "_embedding": [],
          "_parent": 567,
          "_tid": 587,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 569,
          "_embedding": [],
          "_parent": 567,
          "_tid": 588,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 578,
          "_embedding": [],
          "_parent": 567,
          "_tid": 589,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 592,
          "_embedding": [],
          "_parent": 594,
          "_tid": 619,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 615,
          "_embedding": [],
          "_parent": 594,
          "_tid": 620,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 597,
          "_embedding": [],
          "_parent": 599,
          "_tid": 621,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 616,
          "_embedding": [],
          "_parent": 599,
          "_tid": 622,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 603,
          "_embedding": [],
          "_parent": 606,
          "_tid": 623,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 617,
          "_embedding": [],
          "_parent": 606,
          "_tid": 624,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 627,
          "_embedding": [],
          "_parent": 630,
          "_tid": 644,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 640,
          "_embedding": [],
          "_parent": 630,
          "_tid": 645,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 641,
          "_embedding": [],
          "_parent": 636,
          "_tid": 646,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 649,
          "_embedding": [],
          "_parent": 658,
          "_tid": 667,
          "arg_type": "ARGM-DIS"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 651,
          "_embedding": [],
          "_parent": 658,
          "_tid": 668,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 654,
          "_embedding": [],
          "_parent": 658,
          "_tid": 669,
          "arg_type": "ARGM-MOD"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 656,
          "_embedding": [],
          "_parent": 658,
          "_tid": 670,
          "arg_type": "ARGM-NEG"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 664,
          "_embedding": [],
          "_parent": 658,
          "_tid": 671,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 676,
          "_embedding": [],
          "_parent": 688,
          "_tid": 694,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 684,
          "_embedding": [],
          "_parent": 688,
          "_tid": 695,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 692,
          "_embedding": [],
          "_parent": 688,
          "_tid": 696,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 707,
          "_embedding": [],
          "_parent": 711,
          "_tid": 747,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 719,
          "_embedding": [],
          "_parent": 711,
          "_tid": 748,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 722,
          "_embedding": [],
          "_parent": 728,
          "_tid": 749,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 744,
          "_embedding": [],
          "_parent": 728,
          "_tid": 750,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 753,
          "_embedding": [],
          "_parent": 757,
          "_tid": 808,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 755,
          "_embedding": [],
          "_parent": 757,
          "_tid": 809,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 768,
          "_embedding": [],
          "_parent": 757,
          "_tid": 810,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 772,
          "_embedding": [],
          "_parent": 777,
          "_tid": 811,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 806,
          "_embedding": [],
          "_parent": 777,
          "_tid": 812,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 780,
          "_embedding": [],
          "_parent": 789,
          "_tid": 813,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 784,
          "_embedding": [],
          "_parent": 789,
          "_tid": 814,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 787,
          "_embedding": [],
          "_parent": 789,
          "_tid": 815,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 798,
          "_embedding": [],
          "_parent": 805,
          "_tid": 816,
          "arg_type": "ARG2"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 800,
          "_embedding": [],
          "_parent": 805,
          "_tid": 817,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 803,
          "_embedding": [],
          "_parent": 805,
          "_tid": 818,
          "arg_type": "ARGM-ADV"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 824,
          "_embedding": [],
          "_parent": 826,
          "_tid": 839,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 836,
          "_embedding": [],
          "_parent": 826,
          "_tid": 840,
          "arg_type": "C-ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 851,
          "_embedding": [],
          "_parent": 854,
          "_tid": 862,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 860,
          "_embedding": [],
          "_parent": 854,
          "_tid": 863,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 866,
          "_embedding": [],
          "_parent": 870,
          "_tid": 896,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 868,
          "_embedding": [],
          "_parent": 870,
          "_tid": 897,
          "arg_type": "ARG0"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 874,
          "_embedding": [],
          "_parent": 870,
          "_tid": 898,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 876,
          "_embedding": [],
          "_parent": 870,
          "_tid": 899,
          "arg_type": "ARGM-DIR"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 877,
          "_embedding": [],
          "_parent": 884,
          "_tid": 900,
          "arg_type": "ARGM-TMP"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 893,
          "_embedding": [],
          "_parent": 884,
          "_tid": 901,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 880,
          "_embedding": [],
          "_parent": 889,
          "_tid": 902,
          "arg_type": "ARG1"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 891,
          "_embedding": [],
          "_parent": 889,
          "_tid": 903,
          "arg_type": "ARGM-EXT"
        }
      },
      {
        "py/object": "ft.onto.base_ontology.PredicateLink",
        "py/state": {
          "_child": 894,
          "_embedding": [],
          "_parent": 889,
          "_tid": 904,
          "arg_type": "ARG2"
        }
      }
    ],
    "meta": {
      "py/object": "forte.data.data_pack.Meta",
      "py/state": {
        "_pack_id": 3,
        "doc_id": "bn/abc/00/abc_0009",
        "language": "eng",
        "span_unit": "character"
      }
    },
    "orig_text_len": 2212,
    "processed_original_spans": [],
    "replace_back_operations": [],
    "serialization": {
      "next_id": 1383
    }
  }
}',5),
 (44,'project2-doc1-example','{"py/object": "forte.data.data_pack.DataPack", "py/state": {"_text": "During the annual Boston Marathon on April 15, 2013, two homemade pressure cooker bombs detonated 14 seconds and 210 yards (190 m) apart at 2:49 p.m., near the finish line of the race, killing three people and injuring several hundred others, including 16 who lost limbs.\n\nThree days later, the Federal Bureau of Investigation (FBI) released images of two suspects, who were later identified as Chechen Kyrgyzstani-American brothers Dzhokhar Tsarnaev and Tamerlan Tsarnaev. They killed an MIT policeman, kidnapped a man in his car, and had a shootout with the police in nearby Watertown, during which two officers were severely injured, one of whom died a year later. Tamerlan was shot several times, and his brother ran him over while escaping in the stolen car; Tamerlan died soon after.\n\nAn unprecedented manhunt for Dzhokhar ensued on April 19, with thousands of law enforcement officers searching a 20-block area of Watertown; residents of Watertown and surrounding communities were asked to stay indoors, and the transportation system and most businesses and public places closed. Around 6:00 p.m., a Watertown resident discovered Dzhokhar hiding in a boat in his backyard. He was shot and wounded by police before being taken into custody.\n\nDuring questioning, Dzhokhar said that he and his brother were motivated by extremist Islamist beliefs and the wars in Iraq and Afghanistan, that they were self-radicalized and unconnected to any outside terrorist groups, and that he was following his brother''s lead. He said they learned to build explosive devices from an online magazine of the al-Qaeda affiliate in Yemen. He also said they had intended to travel to New York City to bomb Times Square. On April 8, 2015, he was convicted of 30 charges, including use of a weapon of mass destruction and malicious destruction of property resulting in death. Two months later, he was sentenced to death.", "annotations": [{"py/object": "edu.cmu.EventMention", "py/state": {"_embedding": [], "_span": {"begin": 88, "end": 97, "py/object": "forte.data.span.Span"}, "_tid": 0, "event_type": "bombing", "is_valid": null}}, {"py/object": "edu.cmu.EventMention", "py/state": {"_span": {"begin": 185, "end": 192, "py/object": "forte.data.base.Span"}, "is_valid": "True", "_tid": "b5c2a8e8-8048-11ea-8ece-820f078f24c0"}}], "creation_records": {"readers.event_reader.TwoDocumentEventReader": {"py/set": [0]}}, "field_records": {"readers.event_reader.TwoDocumentEventReader": {"py/set": [{"py/tuple": [0, "_event_type"]}]}}, "generics": [], "groups": [], "links": [], "meta": {"py/object": "forte.data.data_pack.Meta", "py/state": {"_pack_id": 1, "doc_id": "00_Abstract", "language": "eng", "span_unit": "character"}}, "orig_text_len": 1902, "processed_original_spans": [], "replace_back_operations": [], "serialization": {"next_id": 3}}}',7);
INSERT INTO "auth_user" ("id","password","last_login","is_superuser","username","last_name","email","is_staff","is_active","date_joined","first_name") VALUES (1,'!UxJj1XC33tta5BGwynr83s3FMVy3PAQGmNDCQV28',NULL,0,'AnonymousUser','','',0,1,'2020-12-03 08:12:09.234988',''),
 (2,'pbkdf2_sha256$180000$s0JH3mcJOxvY$vfOaYjGRjSsGTQ1br2cyq4BJ4kD7OHXuBnKg1gqOwg0=','2020-12-03 08:14:07.372065',1,'admin','','admin@stave.com',1,1,'2020-12-03 08:13:23.439785',''),
 (3,'pbkdf2_sha256$180000$If72pDVs3GxT$RJPLri7XBHtswSvnvfgeUp0WyMY/7KvbVUfvC6QkFG4=','2020-12-03 08:20:05.805555',0,'normal1','','',0,1,'2020-12-03 08:14:34.947900',''),
 (4,'pbkdf2_sha256$180000$OWJVlQn3xT6q$1AeGLAr46ZhpMjVsJVl+MTOZdXLYMtF/f/kuxRqQ1m0=',NULL,0,'normal2','','',0,1,'2020-12-03 08:14:52.948312','');
INSERT INTO "guardian_userobjectpermission" ("id","object_pk","content_type_id","permission_id","user_id") VALUES (1,'7',9,37,3);
INSERT INTO "nlpviewer_backend_project" ("id","name","ontology","user_id","config") VALUES (5,'project-1-example','{
  "name": "base_ontology",
  "definitions": [
    {
      "entry_name": "ft.onto.base_ontology.Token",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation :class:`Token`, used to represent a token or a word.",
      "attributes": [
        {
          "name": "pos",
          "type": "str"
        },
        {
          "name": "ud_xpos",
          "type": "str",
          "description": "Language specific pos tag. Used in CoNLL-U Format. Refer to https://universaldependencies.org/format.html"
        },
        {
          "name": "lemma",
          "type": "str",
          "description": "Lemma or stem of word form."
        },
        {
          "name": "chunk",
          "type": "str"
        },
        {
          "name": "ner",
          "type": "str"
        },
        {
          "name": "sense",
          "type": "str"
        },
        {
          "name": "is_root",
          "type": "bool"
        },
        {
          "name": "ud_features",
          "type": "Dict",
          "key_type": "str",
          "value_type": "str"
        },
        {
          "name": "ud_misc",
          "type": "Dict",
          "key_type": "str",
          "value_type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.Document",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Document`, normally used to represent a document."
    },
    {
      "entry_name": "ft.onto.base_ontology.Sentence",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Sentence`, normally used to represent a sentence.",
      "attributes": [
        {
          "name": "speaker",
          "type": "str"
        },
        {
          "name": "part_id",
          "type": "int"
        },
        {
          "name": "sentiment",
          "type": "Dict",
          "key_type": "str",
          "value_type": "float"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.Phrase",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Phrase`.",
      "attributes": [
        {
          "name": "phrase_type",
          "type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.Utterance",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Utterance`, normally used to represent an utterance in dialogue."
    },
    {
      "entry_name": "ft.onto.base_ontology.PredicateArgument",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `PredicateArgument`, normally used to represent an argument of a predicate, can be linked to the predicate via the predicate link.",
      "attributes": [
        {
          "name": "ner_type",
          "type": "str"
        },
        {
          "name": "predicate_lemma",
          "type": "str"
        },
        {
          "name": "is_verb",
          "type": "bool"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.EntityMention",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `EntityMention`, normally used to represent an Entity Mention in a piece of text.",
      "attributes": [
        {
          "name": "ner_type",
          "type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.EventMention",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `EventMention`, used to refer to a mention of an event.",
      "attributes": [
        {
          "name": "event_type",
          "type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.PredicateMention",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `PredicateMention`, normally used to represent a predicate (normally verbs) in a piece of text.",
      "attributes": [
        {
          "name": "predicate_lemma",
          "type": "str"
        },
        {
          "name": "framenet_id",
          "type": "str"
        },
        {
          "name": "is_verb",
          "type": "bool"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.PredicateLink",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a semantic role link between a predicate and its argument.",
      "attributes": [
        {
          "name": "arg_type",
          "type": "str",
          "description": "The predicate link type."
        }
      ],
      "parent_type": "ft.onto.base_ontology.PredicateMention",
      "child_type": "ft.onto.base_ontology.PredicateArgument"
    },
    {
      "entry_name": "ft.onto.base_ontology.Dependency",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a syntactic dependency.",
      "attributes": [
        {
          "name": "dep_label",
          "type": "str",
          "description": "The dependency label."
        },
        {
          "name": "rel_type",
          "type": "str"
        }
      ],
      "parent_type": "ft.onto.base_ontology.Token",
      "child_type": "ft.onto.base_ontology.Token"
    },
    {
      "entry_name": "ft.onto.base_ontology.EnhancedDependency",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a enhanced dependency: \n https://universaldependencies.org/u/overview/enhanced-syntax.html",
      "attributes": [
        {
          "name": "dep_label",
          "type": "str",
          "description": "The enhanced dependency label in Universal Dependency."
        }
      ],
      "parent_type": "ft.onto.base_ontology.Token",
      "child_type": "ft.onto.base_ontology.Token"
    },
    {
      "entry_name": "ft.onto.base_ontology.RelationLink",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a relation between two entity mentions",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EntityMention",
      "child_type": "ft.onto.base_ontology.EntityMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.CrossDocEntityRelation",
      "parent_entry": "forte.data.ontology.top.MultiPackLink",
      "description": "A `Link` type entry which represent a relation between two entity mentions across the packs.",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EntityMention",
      "child_type": "ft.onto.base_ontology.EntityMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.CoreferenceGroup",
      "parent_entry": "forte.data.ontology.top.Group",
      "description": "A group type entry that take `EntityMention`, as members, used to represent coreferent group of entities.",
      "member_type": "ft.onto.base_ontology.EntityMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.EventRelation",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a relation between two event mentions.",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EventMention",
      "child_type": "ft.onto.base_ontology.EventMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.CrossDocEventRelation",
      "parent_entry": "forte.data.ontology.top.MultiPackLink",
      "description": "A `Link` type entry which represent a relation between two event mentions across the packs.",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EventMention",
      "child_type": "ft.onto.base_ontology.EventMention"
    }
  ]
}',3,''),
 (7,'project-2-example','{
  "name": "all_ontology",
  "definitions": [
    {
      "entry_name": "ft.onto.base_ontology.Token",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation :class:`Token`, used to represent a token or a word.",
      "attributes": [
        {
          "name": "pos",
          "type": "str"
        },
        {
          "name": "ud_xpos",
          "type": "str",
          "description": "Language specific pos tag. Used in CoNLL-U Format. Refer to https://universaldependencies.org/format.html"
        },
        {
          "name": "lemma",
          "type": "str",
          "description": "Lemma or stem of word form."
        },
        {
          "name": "chunk",
          "type": "str"
        },
        {
          "name": "ner",
          "type": "str"
        },
        {
          "name": "sense",
          "type": "str"
        },
        {
          "name": "is_root",
          "type": "bool"
        },
        {
          "name": "ud_features",
          "type": "Dict",
          "key_type": "str",
          "value_type": "str"
        },
        {
          "name": "ud_misc",
          "type": "Dict",
          "key_type": "str",
          "value_type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.Document",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Document`, normally used to represent a document."
    },
    {
      "entry_name": "ft.onto.base_ontology.Sentence",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Sentence`, normally used to represent a sentence.",
      "attributes": [
        {
          "name": "speaker",
          "type": "str"
        },
        {
          "name": "part_id",
          "type": "int"
        },
        {
          "name": "sentiment",
          "type": "Dict",
          "key_type": "str",
          "value_type": "float"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.Phrase",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Phrase`.",
      "attributes": [
        {
          "name": "phrase_type",
          "type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.Utterance",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `Utterance`, normally used to represent an utterance in dialogue."
    },
    {
      "entry_name": "ft.onto.base_ontology.PredicateArgument",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `PredicateArgument`, normally used to represent an argument of a predicate, can be linked to the predicate via the predicate link.",
      "attributes": [
        {
          "name": "ner_type",
          "type": "str"
        },
        {
          "name": "predicate_lemma",
          "type": "str"
        },
        {
          "name": "is_verb",
          "type": "bool"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.EntityMention",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `EntityMention`, normally used to represent an Entity Mention in a piece of text.",
      "attributes": [
        {
          "name": "ner_type",
          "type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.EventMention",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `EventMention`, used to refer to a mention of an event.",
      "attributes": [
        {
          "name": "event_type",
          "type": "str"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.PredicateMention",
      "parent_entry": "forte.data.ontology.top.Annotation",
      "description": "A span based annotation `PredicateMention`, normally used to represent a predicate (normally verbs) in a piece of text.",
      "attributes": [
        {
          "name": "predicate_lemma",
          "type": "str"
        },
        {
          "name": "framenet_id",
          "type": "str"
        },
        {
          "name": "is_verb",
          "type": "bool"
        }
      ]
    },
    {
      "entry_name": "ft.onto.base_ontology.PredicateLink",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a semantic role link between a predicate and its argument.",
      "attributes": [
        {
          "name": "arg_type",
          "type": "str",
          "description": "The predicate link type."
        }
      ],
      "parent_type": "ft.onto.base_ontology.PredicateMention",
      "child_type": "ft.onto.base_ontology.PredicateArgument"
    },
    {
      "entry_name": "ft.onto.base_ontology.Dependency",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a syntactic dependency.",
      "attributes": [
        {
          "name": "dep_label",
          "type": "str",
          "description": "The dependency label."
        },
        {
          "name": "rel_type",
          "type": "str"
        }
      ],
      "parent_type": "ft.onto.base_ontology.Token",
      "child_type": "ft.onto.base_ontology.Token"
    },
    {
      "entry_name": "ft.onto.base_ontology.EnhancedDependency",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a enhanced dependency: \n https://universaldependencies.org/u/overview/enhanced-syntax.html",
      "attributes": [
        {
          "name": "dep_label",
          "type": "str",
          "description": "The enhanced dependency label in Universal Dependency."
        }
      ],
      "parent_type": "ft.onto.base_ontology.Token",
      "child_type": "ft.onto.base_ontology.Token"
    },
    {
      "entry_name": "ft.onto.base_ontology.RelationLink",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a relation between two entity mentions",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EntityMention",
      "child_type": "ft.onto.base_ontology.EntityMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.CrossDocEntityRelation",
      "parent_entry": "forte.data.ontology.top.MultiPackLink",
      "description": "A `Link` type entry which represent a relation between two entity mentions across the packs.",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EntityMention",
      "child_type": "ft.onto.base_ontology.EntityMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.CoreferenceGroup",
      "parent_entry": "forte.data.ontology.top.Group",
      "description": "A group type entry that take `EntityMention`, as members, used to represent coreferent group of entities.",
      "member_type": "ft.onto.base_ontology.EntityMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.EventRelation",
      "parent_entry": "forte.data.ontology.top.Link",
      "description": "A `Link` type entry which represent a relation between two event mentions.",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EventMention",
      "child_type": "ft.onto.base_ontology.EventMention"
    },
    {
      "entry_name": "ft.onto.base_ontology.CrossDocEventRelation",
      "parent_entry": "forte.data.ontology.top.MultiPackLink",
      "description": "A `Link` type entry which represent a relation between two event mentions across the packs.",
      "attributes": [
        {
          "name": "rel_type",
          "type": "str",
          "description": "The type of the relation."
        }
      ],
      "parent_type": "ft.onto.base_ontology.EventMention",
      "child_type": "ft.onto.base_ontology.EventMention"
    },
    {
      "entry_name": "edu.cmu.EventMention",
      "parent_entry": "ft.onto.base_ontology.EventMention",
      "description": "A span based annotation `EventMention`, used to refer to a mention of an event.",
      "attributes": [
        {
          "name": "is_valid",
          "type": "bool"
        }
      ]
    },
    {
      "entry_name": "edu.cmu.CrossEventRelation",
      "parent_entry": "ft.onto.base_ontology.CrossDocEventRelation",
      "description": "Represent relation cross documents.",
      "attributes": [
        {
          "name": "evidence",
          "type": "str"
        }
      ],
      "parent_type": "edu.cmu.EventMention",
      "child_type": "edu.cmu.EventMention"
    }
  ]
}',4,'');
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups" (
	"user_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_group_id_97559544" ON "auth_user_groups" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions" (
	"user_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "nlpviewer_backend_document_project_id_a14a056d" ON "nlpviewer_backend_document" (
	"project_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "guardian_userobjectpermission_user_id_permission_id_object_pk_b0b3d2fc_uniq" ON "guardian_userobjectpermission" (
	"user_id",
	"permission_id",
	"object_pk"
);
CREATE UNIQUE INDEX IF NOT EXISTS "guardian_groupobjectpermission_group_id_permission_id_object_pk_3f189f7c_uniq" ON "guardian_groupobjectpermission" (
	"group_id",
	"permission_id",
	"object_pk"
);
CREATE INDEX IF NOT EXISTS "guardian_groupobjectpermission_content_type_id_7ade36b8" ON "guardian_groupobjectpermission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "guardian_groupobjectpermission_group_id_4bbbfb62" ON "guardian_groupobjectpermission" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "guardian_groupobjectpermission_permission_id_36572738" ON "guardian_groupobjectpermission" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "guardian_userobjectpermission_content_type_id_2e892405" ON "guardian_userobjectpermission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "guardian_userobjectpermission_permission_id_71807bfc" ON "guardian_userobjectpermission" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "guardian_userobjectpermission_user_id_d5c1e964" ON "guardian_userobjectpermission" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "guardian_gr_content_ae6aec_idx" ON "guardian_groupobjectpermission" (
	"content_type_id",
	"object_pk"
);
CREATE INDEX IF NOT EXISTS "guardian_us_content_179ed2_idx" ON "guardian_userobjectpermission" (
	"content_type_id",
	"object_pk"
);
CREATE INDEX IF NOT EXISTS "nlpviewer_backend_project_user_id_da89c05a" ON "nlpviewer_backend_project" (
	"user_id"
);
COMMIT;
