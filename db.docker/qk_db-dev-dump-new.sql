toc.dat                                                                                             0000600 0004000 0002000 00000041577 14235022525 0014455 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                           z            qualkey    13.6 (Debian 13.6-1.pgdg110+1)    13.6 (Debian 13.6-1.pgdg110+1) /               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    16384    qualkey    DATABASE     [   CREATE DATABASE qualkey WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE qualkey;
                qualkey    false         �           1247    17890    CredentialChangeRequestStatus    TYPE     n   CREATE TYPE public."CredentialChangeRequestStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
 2   DROP TYPE public."CredentialChangeRequestStatus";
       public          qualkey    false         �           1247    17862    CredentialStatus    TYPE     �   CREATE TYPE public."CredentialStatus" AS ENUM (
    'NEW',
    'UPLOADING_TO_BLOCKCHAIN',
    'FAILED_UPLOADING_TO_BLOCKCHAIN',
    'UPLOADED_TO_BLOCKCHAIN',
    'ACTIVATED',
    'WITHDRAWN'
);
 %   DROP TYPE public."CredentialStatus";
       public          qualkey    false         �           1247    17876    InsitutionStatus    TYPE     N   CREATE TYPE public."InsitutionStatus" AS ENUM (
    'ACTIVE',
    'CLOSED'
);
 %   DROP TYPE public."InsitutionStatus";
       public          qualkey    false         |           1247    17843    Role    TYPE     w   CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'INSTITUTION_REPRESENTATIVE',
    'STUDENT'
);
    DROP TYPE public."Role";
       public          qualkey    false         �           1247    17898    TransactionStatus    TYPE     l   CREATE TYPE public."TransactionStatus" AS ENUM (
    'NEW',
    'PENDING',
    'CONFIRMED',
    'FAILED'
);
 &   DROP TYPE public."TransactionStatus";
       public          qualkey    false         �           1247    17882    UploadStatus    TYPE     ]   CREATE TYPE public."UploadStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
 !   DROP TYPE public."UploadStatus";
       public          qualkey    false         �            1259    17832    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    qualkey    false         �            1259    17954    credentialChangeRequests    TABLE     �  CREATE TABLE public."credentialChangeRequests" (
    uuid text NOT NULL,
    status public."CredentialChangeRequestStatus" DEFAULT 'PENDING'::public."CredentialChangeRequestStatus" NOT NULL,
    "requestedBy" text NOT NULL,
    "confirmedBy" text NOT NULL,
    "changedFrom" text NOT NULL,
    "changedTo" text NOT NULL,
    "fieldName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 .   DROP TABLE public."credentialChangeRequests";
       public         heap    qualkey    false    652    652         �            1259    17944    credentialChanges    TABLE     V  CREATE TABLE public."credentialChanges" (
    id integer NOT NULL,
    "credentialUuid" text NOT NULL,
    "changedByUuid" text NOT NULL,
    "changedFrom" text NOT NULL,
    "changedTo" text NOT NULL,
    "fieldName" text NOT NULL,
    "changedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash text NOT NULL
);
 '   DROP TABLE public."credentialChanges";
       public         heap    qualkey    false         �            1259    17942    credentialChanges_id_seq    SEQUENCE     �   CREATE SEQUENCE public."credentialChanges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."credentialChanges_id_seq";
       public          qualkey    false    207                    0    0    credentialChanges_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."credentialChanges_id_seq" OWNED BY public."credentialChanges".id;
          public          qualkey    false    206         �            1259    17933    credentialShares    TABLE     k  CREATE TABLE public."credentialShares" (
    uuid text NOT NULL,
    "recipientEmail" text NOT NULL,
    "viewsCount" integer DEFAULT 0 NOT NULL,
    "credentialUuid" text NOT NULL,
    "temporaryPassword" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public."credentialShares";
       public         heap    qualkey    false         �            1259    17907    credentials    TABLE       CREATE TABLE public.credentials (
    uuid text NOT NULL,
    did text NOT NULL,
    status public."CredentialStatus" NOT NULL,
    "studentUuid" text NOT NULL,
    "institutionUuid" text NOT NULL,
    "certificateId" text,
    "graduatedName" text,
    "authenticatedBy" text,
    "qualificationName" text,
    majors text,
    minors text,
    "authenticatedTitle" text,
    "awardingInstitution" text,
    "qualificationLevel" text,
    "awardLevel" text,
    "studyLanguage" text,
    info text,
    "gpaFinalGrade" text,
    "authenticatedAt" timestamp(3) without time zone,
    "studyStartedAt" timestamp(3) without time zone,
    "studyEndedAt" timestamp(3) without time zone,
    "graduatedAt" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone
);
    DROP TABLE public.credentials;
       public         heap    qualkey    false    643         �            1259    17915    institutions    TABLE     q  CREATE TABLE public.institutions (
    uuid text NOT NULL,
    status public."InsitutionStatus" DEFAULT 'ACTIVE'::public."InsitutionStatus" NOT NULL,
    "emailDomain" text NOT NULL,
    "logoUrl" text,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
     DROP TABLE public.institutions;
       public         heap    qualkey    false    646    646         �            1259    17963    transactions    TABLE     k  CREATE TABLE public.transactions (
    uuid text NOT NULL,
    status public."TransactionStatus" DEFAULT 'NEW'::public."TransactionStatus" NOT NULL,
    "credentialUuid" text NOT NULL,
    fee text,
    hash text,
    hex text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "confirmedAt" timestamp(3) without time zone
);
     DROP TABLE public.transactions;
       public         heap    qualkey    false    655    655         �            1259    17924    uploads    TABLE     �  CREATE TABLE public.uploads (
    uuid text NOT NULL,
    status public."UploadStatus" DEFAULT 'PENDING'::public."UploadStatus" NOT NULL,
    "uploadedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    file_url text NOT NULL,
    mapping text NOT NULL
);
    DROP TABLE public.uploads;
       public         heap    qualkey    false    649    649         �            1259    17851    users    TABLE     _  CREATE TABLE public.users (
    uuid text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" text,
    "lastName" text,
    "institutionUuid" text
);
    DROP TABLE public.users;
       public         heap    qualkey    false    636         j           2604    19166    credentialChanges id    DEFAULT     �   ALTER TABLE ONLY public."credentialChanges" ALTER COLUMN id SET DEFAULT nextval('public."credentialChanges_id_seq"'::regclass);
 E   ALTER TABLE public."credentialChanges" ALTER COLUMN id DROP DEFAULT;
       public          qualkey    false    207    206    207         	          0    17832    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          qualkey    false    200       3081.dat           0    17954    credentialChangeRequests 
   TABLE DATA           �   COPY public."credentialChangeRequests" (uuid, status, "requestedBy", "confirmedBy", "changedFrom", "changedTo", "fieldName", "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    208       3089.dat           0    17944    credentialChanges 
   TABLE DATA           �   COPY public."credentialChanges" (id, "credentialUuid", "changedByUuid", "changedFrom", "changedTo", "fieldName", "changedAt", hash) FROM stdin;
    public          qualkey    false    207       3088.dat           0    17933    credentialShares 
   TABLE DATA           �   COPY public."credentialShares" (uuid, "recipientEmail", "viewsCount", "credentialUuid", "temporaryPassword", "expiresAt", "createdAt") FROM stdin;
    public          qualkey    false    205       3086.dat           0    17907    credentials 
   TABLE DATA           ~  COPY public.credentials (uuid, did, status, "studentUuid", "institutionUuid", "certificateId", "graduatedName", "authenticatedBy", "qualificationName", majors, minors, "authenticatedTitle", "awardingInstitution", "qualificationLevel", "awardLevel", "studyLanguage", info, "gpaFinalGrade", "authenticatedAt", "studyStartedAt", "studyEndedAt", "graduatedAt", "expiresAt") FROM stdin;
    public          qualkey    false    202       3083.dat           0    17915    institutions 
   TABLE DATA           n   COPY public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    203       3084.dat           0    17963    transactions 
   TABLE DATA           r   COPY public.transactions (uuid, status, "credentialUuid", fee, hash, hex, "createdAt", "confirmedAt") FROM stdin;
    public          qualkey    false    209       3090.dat           0    17924    uploads 
   TABLE DATA           �   COPY public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", file_url, mapping) FROM stdin;
    public          qualkey    false    204       3085.dat 
          0    17851    users 
   TABLE DATA           �   COPY public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "institutionUuid") FROM stdin;
    public          qualkey    false    201       3082.dat            0    0    credentialChanges_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."credentialChanges_id_seq"', 1, false);
          public          qualkey    false    206         p           2606    17841 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            qualkey    false    200         �           2606    17962 6   credentialChangeRequests credentialChangeRequests_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."credentialChangeRequests"
    ADD CONSTRAINT "credentialChangeRequests_pkey" PRIMARY KEY (uuid);
 d   ALTER TABLE ONLY public."credentialChangeRequests" DROP CONSTRAINT "credentialChangeRequests_pkey";
       public            qualkey    false    208                    2606    17953 (   credentialChanges credentialChanges_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."credentialChanges"
    ADD CONSTRAINT "credentialChanges_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."credentialChanges" DROP CONSTRAINT "credentialChanges_pkey";
       public            qualkey    false    207         }           2606    17941 &   credentialShares credentialShares_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."credentialShares"
    ADD CONSTRAINT "credentialShares_pkey" PRIMARY KEY (uuid);
 T   ALTER TABLE ONLY public."credentialShares" DROP CONSTRAINT "credentialShares_pkey";
       public            qualkey    false    205         v           2606    17914    credentials credentials_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (uuid);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            qualkey    false    202         y           2606    17923    institutions institutions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.institutions
    ADD CONSTRAINT institutions_pkey PRIMARY KEY (uuid);
 H   ALTER TABLE ONLY public.institutions DROP CONSTRAINT institutions_pkey;
       public            qualkey    false    203         �           2606    17971    transactions transactions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (uuid);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            qualkey    false    209         {           2606    17932    uploads uploads_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (uuid);
 >   ALTER TABLE ONLY public.uploads DROP CONSTRAINT uploads_pkey;
       public            qualkey    false    204         s           2606    17859    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            qualkey    false    201         t           1259    17972    credentials_did_key    INDEX     Q   CREATE UNIQUE INDEX credentials_did_key ON public.credentials USING btree (did);
 '   DROP INDEX public.credentials_did_key;
       public            qualkey    false    202         w           1259    17973    institutions_emailDomain_key    INDEX     g   CREATE UNIQUE INDEX "institutions_emailDomain_key" ON public.institutions USING btree ("emailDomain");
 2   DROP INDEX public."institutions_emailDomain_key";
       public            qualkey    false    203         q           1259    17860    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            qualkey    false    201         �           2606    17979 ,   credentials credentials_institutionUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT "credentials_institutionUuid_fkey";
       public          qualkey    false    202    2937    203         �           2606    17974 (   credentials credentials_studentUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.credentials DROP CONSTRAINT "credentials_studentUuid_fkey";
       public          qualkey    false    201    202    2931         �           2606    18863     users users_institutionUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_institutionUuid_fkey";
       public          qualkey    false    2937    201    203                                                                                                                                         3081.dat                                                                                            0000600 0004000 0002000 00000002247 14235022525 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2c97a8f2-6ed9-4847-bb5d-0b1bd9b1052d	75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0	2022-04-29 22:51:32.917875+00	20220427134050_init	\N	\N	2022-04-29 22:51:32.848014+00	1
583f605c-89b1-4748-a597-81d85d5d5618	7f6c78e32d7eb2466d6e4ca9e1ba0ca17018f92e5703915ee06263133cc4d1e4	2022-04-29 22:51:33.110765+00	20220429224530_update_models_30_04	\N	\N	2022-04-29 22:51:32.924133+00	1
1c02144e-b42b-49be-9099-7250039561b1	56f3d4090d8f90c1381da67d2da5ef43a843690c0e19de0405c285db4a8a6592	2022-04-29 22:51:35.149003+00	20220429225135_test_migration	\N	\N	2022-04-29 22:51:35.13291+00	1
4b425046-2386-4116-8618-7c3b9b605d7e	75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0	2022-04-27 21:27:52.781552+00	20220427134050_init	\N	\N	2022-04-27 21:27:52.769912+00	1
c694e44f-e28c-4a3b-b6bb-545dcb94d1f3	75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0	2022-04-27 13:48:56.073734+00	20220427134050_init	\N	\N	2022-04-27 13:48:56.052726+00	1
797815df-e0d2-48d7-990d-5f72c691613f	56f3d4090d8f90c1381da67d2da5ef43a843690c0e19de0405c285db4a8a6592	2022-05-05 18:26:27.296331+00	20220429225129_update_models_30_04_defaults	\N	\N	2022-05-05 18:26:27.2391+00	1
\.


                                                                                                                                                                                                                                                                                                                                                         3089.dat                                                                                            0000600 0004000 0002000 00000000005 14235022525 0014250 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3088.dat                                                                                            0000600 0004000 0002000 00000000005 14235022525 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3086.dat                                                                                            0000600 0004000 0002000 00000000005 14235022525 0014245 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3083.dat                                                                                            0000600 0004000 0002000 00000000005 14235022525 0014242 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3084.dat                                                                                            0000600 0004000 0002000 00000000313 14235022525 0014245 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        81027691-9f9d-4c5b-807a-396d376f7faa	ACTIVE	stanford.com	https://logodownload.org/wp-content/uploads/2021/04/stanford-university-logo.png	Stanford University	2022-05-05 21:18:09	2022-05-05 21:18:11
\.


                                                                                                                                                                                                                                                                                                                     3090.dat                                                                                            0000600 0004000 0002000 00000000005 14235022525 0014240 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3085.dat                                                                                            0000600 0004000 0002000 00000000457 14235022525 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        f5dc1954-b147-4e13-89f7-bf99be1b95fc	PENDING	4728859d-622b-4ec0-8f60-75caa0d17c13	4728859d-622b-4ec0-8f60-75caa0d17c13;abbbd9cd-ba5e-4de0-bb52-523b7833764f		2022-05-05 18:43:21.362	2022-05-05 18:43:21.377	aaffd4db-5114-4c66-8bcc-76f678bdb7eb.csv	"something,,,,first_name,full_name,,,,graduated_at"
\.


                                                                                                                                                                                                                 3082.dat                                                                                            0000600 0004000 0002000 00000001534 14235022525 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        bf4fe6f3-f5a1-4794-aced-4deb4ba8c67a	student@student.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-04-28 10:35:09.983	2022-04-28 10:35:09.983	Student	Student	\N
00e5daba-fd08-4146-af73-deb67e6dd2ea	admin@admin.com	$2a$10$6X/3no1.v5A3ygHPMGF7a.FKaOa2TkekqsWIq9ADRBOOm8Y1CcrgW	SUPER_ADMIN	2022-04-27 22:10:57	2022-04-27 22:11:34	Admin	Admin	\N
4728859d-622b-4ec0-8f60-75caa0d17c13	institution@institution.com	$2a$10$vz2liRFu3Ho7rLdEInKO5./ZjUsynDfhLTuaIRqdNLh0ewCfILZKG	INSTITUTION_REPRESENTATIVE	2022-04-28 10:36:50.567	2022-04-28 10:36:50.567	Institution	Institution	81027691-9f9d-4c5b-807a-396d376f7faa
abbbd9cd-ba5e-4de0-bb52-523b7833764f	stanford@institution.com	$2a$10$vz2liRFu3Ho7rLdEInKO5	INSTITUTION_REPRESENTATIVE	2022-05-05 21:19:56	2022-05-05 21:19:55	Stanford	Representative	81027691-9f9d-4c5b-807a-396d376f7faa
\.


                                                                                                                                                                    restore.sql                                                                                         0000600 0004000 0002000 00000037134 14235022525 0015374 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Debian 13.6-1.pgdg110+1)
-- Dumped by pg_dump version 13.6 (Debian 13.6-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE qualkey;
--
-- Name: qualkey; Type: DATABASE; Schema: -; Owner: qualkey
--

CREATE DATABASE qualkey WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE qualkey OWNER TO qualkey;

\connect qualkey

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: CredentialChangeRequestStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."CredentialChangeRequestStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."CredentialChangeRequestStatus" OWNER TO qualkey;

--
-- Name: CredentialStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."CredentialStatus" AS ENUM (
    'NEW',
    'UPLOADING_TO_BLOCKCHAIN',
    'FAILED_UPLOADING_TO_BLOCKCHAIN',
    'UPLOADED_TO_BLOCKCHAIN',
    'ACTIVATED',
    'WITHDRAWN'
);


ALTER TYPE public."CredentialStatus" OWNER TO qualkey;

--
-- Name: InsitutionStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."InsitutionStatus" AS ENUM (
    'ACTIVE',
    'CLOSED'
);


ALTER TYPE public."InsitutionStatus" OWNER TO qualkey;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'INSTITUTION_REPRESENTATIVE',
    'STUDENT'
);


ALTER TYPE public."Role" OWNER TO qualkey;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'NEW',
    'PENDING',
    'CONFIRMED',
    'FAILED'
);


ALTER TYPE public."TransactionStatus" OWNER TO qualkey;

--
-- Name: UploadStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."UploadStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."UploadStatus" OWNER TO qualkey;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO qualkey;

--
-- Name: credentialChangeRequests; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialChangeRequests" (
    uuid text NOT NULL,
    status public."CredentialChangeRequestStatus" DEFAULT 'PENDING'::public."CredentialChangeRequestStatus" NOT NULL,
    "requestedBy" text NOT NULL,
    "confirmedBy" text NOT NULL,
    "changedFrom" text NOT NULL,
    "changedTo" text NOT NULL,
    "fieldName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."credentialChangeRequests" OWNER TO qualkey;

--
-- Name: credentialChanges; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialChanges" (
    id integer NOT NULL,
    "credentialUuid" text NOT NULL,
    "changedByUuid" text NOT NULL,
    "changedFrom" text NOT NULL,
    "changedTo" text NOT NULL,
    "fieldName" text NOT NULL,
    "changedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash text NOT NULL
);


ALTER TABLE public."credentialChanges" OWNER TO qualkey;

--
-- Name: credentialChanges_id_seq; Type: SEQUENCE; Schema: public; Owner: qualkey
--

CREATE SEQUENCE public."credentialChanges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."credentialChanges_id_seq" OWNER TO qualkey;

--
-- Name: credentialChanges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qualkey
--

ALTER SEQUENCE public."credentialChanges_id_seq" OWNED BY public."credentialChanges".id;


--
-- Name: credentialShares; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialShares" (
    uuid text NOT NULL,
    "recipientEmail" text NOT NULL,
    "viewsCount" integer DEFAULT 0 NOT NULL,
    "credentialUuid" text NOT NULL,
    "temporaryPassword" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."credentialShares" OWNER TO qualkey;

--
-- Name: credentials; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.credentials (
    uuid text NOT NULL,
    did text NOT NULL,
    status public."CredentialStatus" NOT NULL,
    "studentUuid" text NOT NULL,
    "institutionUuid" text NOT NULL,
    "certificateId" text,
    "graduatedName" text,
    "authenticatedBy" text,
    "qualificationName" text,
    majors text,
    minors text,
    "authenticatedTitle" text,
    "awardingInstitution" text,
    "qualificationLevel" text,
    "awardLevel" text,
    "studyLanguage" text,
    info text,
    "gpaFinalGrade" text,
    "authenticatedAt" timestamp(3) without time zone,
    "studyStartedAt" timestamp(3) without time zone,
    "studyEndedAt" timestamp(3) without time zone,
    "graduatedAt" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone
);


ALTER TABLE public.credentials OWNER TO qualkey;

--
-- Name: institutions; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.institutions (
    uuid text NOT NULL,
    status public."InsitutionStatus" DEFAULT 'ACTIVE'::public."InsitutionStatus" NOT NULL,
    "emailDomain" text NOT NULL,
    "logoUrl" text,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.institutions OWNER TO qualkey;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.transactions (
    uuid text NOT NULL,
    status public."TransactionStatus" DEFAULT 'NEW'::public."TransactionStatus" NOT NULL,
    "credentialUuid" text NOT NULL,
    fee text,
    hash text,
    hex text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "confirmedAt" timestamp(3) without time zone
);


ALTER TABLE public.transactions OWNER TO qualkey;

--
-- Name: uploads; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.uploads (
    uuid text NOT NULL,
    status public."UploadStatus" DEFAULT 'PENDING'::public."UploadStatus" NOT NULL,
    "uploadedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    file_url text NOT NULL,
    mapping text NOT NULL
);


ALTER TABLE public.uploads OWNER TO qualkey;

--
-- Name: users; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.users (
    uuid text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" text,
    "lastName" text,
    "institutionUuid" text
);


ALTER TABLE public.users OWNER TO qualkey;

--
-- Name: credentialChanges id; Type: DEFAULT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChanges" ALTER COLUMN id SET DEFAULT nextval('public."credentialChanges_id_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.
COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM '$$PATH$$/3081.dat';

--
-- Data for Name: credentialChangeRequests; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialChangeRequests" (uuid, status, "requestedBy", "confirmedBy", "changedFrom", "changedTo", "fieldName", "createdAt", "updatedAt") FROM stdin;
\.
COPY public."credentialChangeRequests" (uuid, status, "requestedBy", "confirmedBy", "changedFrom", "changedTo", "fieldName", "createdAt", "updatedAt") FROM '$$PATH$$/3089.dat';

--
-- Data for Name: credentialChanges; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialChanges" (id, "credentialUuid", "changedByUuid", "changedFrom", "changedTo", "fieldName", "changedAt", hash) FROM stdin;
\.
COPY public."credentialChanges" (id, "credentialUuid", "changedByUuid", "changedFrom", "changedTo", "fieldName", "changedAt", hash) FROM '$$PATH$$/3088.dat';

--
-- Data for Name: credentialShares; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialShares" (uuid, "recipientEmail", "viewsCount", "credentialUuid", "temporaryPassword", "expiresAt", "createdAt") FROM stdin;
\.
COPY public."credentialShares" (uuid, "recipientEmail", "viewsCount", "credentialUuid", "temporaryPassword", "expiresAt", "createdAt") FROM '$$PATH$$/3086.dat';

--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.credentials (uuid, did, status, "studentUuid", "institutionUuid", "certificateId", "graduatedName", "authenticatedBy", "qualificationName", majors, minors, "authenticatedTitle", "awardingInstitution", "qualificationLevel", "awardLevel", "studyLanguage", info, "gpaFinalGrade", "authenticatedAt", "studyStartedAt", "studyEndedAt", "graduatedAt", "expiresAt") FROM stdin;
\.
COPY public.credentials (uuid, did, status, "studentUuid", "institutionUuid", "certificateId", "graduatedName", "authenticatedBy", "qualificationName", majors, minors, "authenticatedTitle", "awardingInstitution", "qualificationLevel", "awardLevel", "studyLanguage", info, "gpaFinalGrade", "authenticatedAt", "studyStartedAt", "studyEndedAt", "graduatedAt", "expiresAt") FROM '$$PATH$$/3083.dat';

--
-- Data for Name: institutions; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") FROM stdin;
\.
COPY public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") FROM '$$PATH$$/3084.dat';

--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.transactions (uuid, status, "credentialUuid", fee, hash, hex, "createdAt", "confirmedAt") FROM stdin;
\.
COPY public.transactions (uuid, status, "credentialUuid", fee, hash, hex, "createdAt", "confirmedAt") FROM '$$PATH$$/3090.dat';

--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", file_url, mapping) FROM stdin;
\.
COPY public.uploads (uuid, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt", file_url, mapping) FROM '$$PATH$$/3085.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "institutionUuid") FROM stdin;
\.
COPY public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "institutionUuid") FROM '$$PATH$$/3082.dat';

--
-- Name: credentialChanges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qualkey
--

SELECT pg_catalog.setval('public."credentialChanges_id_seq"', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: credentialChangeRequests credentialChangeRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChangeRequests"
    ADD CONSTRAINT "credentialChangeRequests_pkey" PRIMARY KEY (uuid);


--
-- Name: credentialChanges credentialChanges_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChanges"
    ADD CONSTRAINT "credentialChanges_pkey" PRIMARY KEY (id);


--
-- Name: credentialShares credentialShares_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialShares"
    ADD CONSTRAINT "credentialShares_pkey" PRIMARY KEY (uuid);


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (uuid);


--
-- Name: institutions institutions_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.institutions
    ADD CONSTRAINT institutions_pkey PRIMARY KEY (uuid);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (uuid);


--
-- Name: uploads uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (uuid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: credentials_did_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX credentials_did_key ON public.credentials USING btree (did);


--
-- Name: institutions_emailDomain_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "institutions_emailDomain_key" ON public.institutions USING btree ("emailDomain");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: credentials credentials_institutionUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: credentials credentials_studentUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_institutionUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    