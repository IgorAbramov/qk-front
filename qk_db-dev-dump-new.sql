toc.dat                                                                                             0000600 0004000 0002000 00000074240 14247262364 0014460 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       ,                    z            qualkey    13.6 (Debian 13.6-1.pgdg110+1)    13.6 (Debian 13.6-1.pgdg110+1) U    h           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         i           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         j           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         k           1262    16384    qualkey    DATABASE     [   CREATE DATABASE qualkey WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE qualkey;
                qualkey    false         �           1247    28196    CredentialChangeRequestStatus    TYPE     n   CREATE TYPE public."CredentialChangeRequestStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
 2   DROP TYPE public."CredentialChangeRequestStatus";
       public          qualkey    false         �           1247    28166    CredentialStatus    TYPE     �   CREATE TYPE public."CredentialStatus" AS ENUM (
    'NEW',
    'UPLOADING_TO_BLOCKCHAIN',
    'FAILED_UPLOADING_TO_BLOCKCHAIN',
    'UPLOADED_TO_BLOCKCHAIN',
    'ACTIVATED',
    'WITHDRAWN',
    'EXPIRED'
);
 %   DROP TYPE public."CredentialStatus";
       public          qualkey    false         �           1247    28182    InsitutionStatus    TYPE     N   CREATE TYPE public."InsitutionStatus" AS ENUM (
    'ACTIVE',
    'CLOSED'
);
 %   DROP TYPE public."InsitutionStatus";
       public          qualkey    false         �           1247    28228    PaymentStatus    TYPE     ]   CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);
 "   DROP TYPE public."PaymentStatus";
       public          qualkey    false         �           1247    28157    Role    TYPE     w   CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'INSTITUTION_REPRESENTATIVE',
    'STUDENT'
);
    DROP TYPE public."Role";
       public          qualkey    false         �           1247    28222    SmartContractStatus    TYPE     [   CREATE TYPE public."SmartContractStatus" AS ENUM (
    'ACTIVE',
    'STORAGE_EXCEEDED'
);
 (   DROP TYPE public."SmartContractStatus";
       public          qualkey    false         �           1247    28204    TransactionStatus    TYPE     l   CREATE TYPE public."TransactionStatus" AS ENUM (
    'NEW',
    'PENDING',
    'CONFIRMED',
    'FAILED'
);
 &   DROP TYPE public."TransactionStatus";
       public          qualkey    false         �           1247    28188    UploadStatus    TYPE     ]   CREATE TYPE public."UploadStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
 !   DROP TYPE public."UploadStatus";
       public          qualkey    false         �           1247    28214    UserActionType    TYPE     {   CREATE TYPE public."UserActionType" AS ENUM (
    'REVIEW_UPLOAD',
    'REVIEW_WITHDRAWAL',
    'REVIEW_CHANGE_REQUEST'
);
 #   DROP TYPE public."UserActionType";
       public          qualkey    false         �            1259    28144    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
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
       public         heap    qualkey    false         �            1259    28296    credentialChangeRequests    TABLE     �  CREATE TABLE public."credentialChangeRequests" (
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
       public         heap    qualkey    false    656    656         �            1259    28286    credentialChanges    TABLE     q  CREATE TABLE public."credentialChanges" (
    id integer NOT NULL,
    "credentialUuid" text NOT NULL,
    "credentialDid" text NOT NULL,
    "changedByUuid" text,
    "changedFrom" text,
    "changedTo" text,
    "fieldName" text,
    "changedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash text NOT NULL,
    "smartContractId" text
);
 '   DROP TABLE public."credentialChanges";
       public         heap    qualkey    false         �            1259    28284    credentialChanges_id_seq    SEQUENCE     �   CREATE SEQUENCE public."credentialChanges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."credentialChanges_id_seq";
       public          qualkey    false    207         l           0    0    credentialChanges_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."credentialChanges_id_seq" OWNED BY public."credentialChanges".id;
          public          qualkey    false    206         �            1259    28275    credentialShares    TABLE     a  CREATE TABLE public."credentialShares" (
    uuid text NOT NULL,
    "recipientEmails" text NOT NULL,
    "credentialUuid" text NOT NULL,
    "sharedFields" text NOT NULL,
    "temporaryPassword" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public."credentialShares";
       public         heap    qualkey    false         �            1259    28245    credentials    TABLE     �  CREATE TABLE public.credentials (
    uuid text NOT NULL,
    did text NOT NULL,
    status public."CredentialStatus" DEFAULT 'NEW'::public."CredentialStatus" NOT NULL,
    "studentUuid" text NOT NULL,
    "institutionUuid" text NOT NULL,
    "uploadUuid" text NOT NULL,
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
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.credentials;
       public         heap    qualkey    false    647    647         �            1259    28328    credentialsWithdrawalRequests    TABLE     j  CREATE TABLE public."credentialsWithdrawalRequests" (
    uuid text NOT NULL,
    "credentialsUuid" text NOT NULL,
    "initiatedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 3   DROP TABLE public."credentialsWithdrawalRequests";
       public         heap    qualkey    false         �            1259    28255    institutions    TABLE     q  CREATE TABLE public.institutions (
    uuid text NOT NULL,
    status public."InsitutionStatus" DEFAULT 'ACTIVE'::public."InsitutionStatus" NOT NULL,
    "emailDomain" text NOT NULL,
    "logoUrl" text,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
     DROP TABLE public.institutions;
       public         heap    qualkey    false    650    650         �            1259    28337    oneTimePasswords    TABLE     �   CREATE TABLE public."oneTimePasswords" (
    uuid text NOT NULL,
    code text NOT NULL,
    "validUntil" timestamp(3) without time zone NOT NULL,
    "canBeResentAt" timestamp(3) without time zone NOT NULL
);
 &   DROP TABLE public."oneTimePasswords";
       public         heap    qualkey    false         �            1259    28365    payments    TABLE     �  CREATE TABLE public.payments (
    uuid text NOT NULL,
    "externalId" text NOT NULL,
    "studentUuid" text NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    amount numeric(10,2) DEFAULT 0.00 NOT NULL,
    currency text NOT NULL,
    method text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "credentialUuids" text[]
);
    DROP TABLE public.payments;
       public         heap    qualkey    false    668    668         �            1259    28345    smartContracts    TABLE     �   CREATE TABLE public."smartContracts" (
    id text NOT NULL,
    status public."SmartContractStatus" DEFAULT 'ACTIVE'::public."SmartContractStatus" NOT NULL,
    "deployedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 $   DROP TABLE public."smartContracts";
       public         heap    qualkey    false    665    665         �            1259    28355    systemSettings    TABLE     �   CREATE TABLE public."systemSettings" (
    id integer NOT NULL,
    name text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 $   DROP TABLE public."systemSettings";
       public         heap    qualkey    false         �            1259    28353    systemSettings_id_seq    SEQUENCE     �   CREATE SEQUENCE public."systemSettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."systemSettings_id_seq";
       public          qualkey    false    216         m           0    0    systemSettings_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."systemSettings_id_seq" OWNED BY public."systemSettings".id;
          public          qualkey    false    215         �            1259    28306    transactions    TABLE     �  CREATE TABLE public.transactions (
    uuid text NOT NULL,
    status public."TransactionStatus" DEFAULT 'NEW'::public."TransactionStatus" NOT NULL,
    "credentialUuid" text NOT NULL,
    fee text,
    hash text,
    hex text,
    "smartContractId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "confirmedAt" timestamp(3) without time zone
);
     DROP TABLE public.transactions;
       public         heap    qualkey    false    659    659         �            1259    28265    uploads    TABLE     �  CREATE TABLE public.uploads (
    uuid text NOT NULL,
    filename text NOT NULL,
    "originalFilename" text NOT NULL,
    mapping text NOT NULL,
    status public."UploadStatus" DEFAULT 'PENDING'::public."UploadStatus" NOT NULL,
    "uploadedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.uploads;
       public         heap    qualkey    false    653    653         �            1259    28318    userActions    TABLE     ;  CREATE TABLE public."userActions" (
    id integer NOT NULL,
    "userUuid" text NOT NULL,
    "initiatorName" text NOT NULL,
    type public."UserActionType" NOT NULL,
    "subjectUuid" text NOT NULL,
    "credentialsUuid" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public."userActions";
       public         heap    qualkey    false    662         �            1259    28316    userActions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."userActions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."userActions_id_seq";
       public          qualkey    false    211         n           0    0    userActions_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."userActions_id_seq" OWNED BY public."userActions".id;
          public          qualkey    false    210         �            1259    28235    users    TABLE     �  CREATE TABLE public.users (
    uuid text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "firstName" text,
    "lastName" text,
    currency text DEFAULT 'GBP'::text NOT NULL,
    "stripeCustomerId" text,
    "institutionUuid" text
);
    DROP TABLE public.users;
       public         heap    qualkey    false    644         �           2604    28423    credentialChanges id    DEFAULT     �   ALTER TABLE ONLY public."credentialChanges" ALTER COLUMN id SET DEFAULT nextval('public."credentialChanges_id_seq"'::regclass);
 E   ALTER TABLE public."credentialChanges" ALTER COLUMN id DROP DEFAULT;
       public          qualkey    false    206    207    207         �           2604    28358    systemSettings id    DEFAULT     z   ALTER TABLE ONLY public."systemSettings" ALTER COLUMN id SET DEFAULT nextval('public."systemSettings_id_seq"'::regclass);
 B   ALTER TABLE public."systemSettings" ALTER COLUMN id DROP DEFAULT;
       public          qualkey    false    215    216    216         �           2604    28321    userActions id    DEFAULT     t   ALTER TABLE ONLY public."userActions" ALTER COLUMN id SET DEFAULT nextval('public."userActions_id_seq"'::regclass);
 ?   ALTER TABLE public."userActions" ALTER COLUMN id DROP DEFAULT;
       public          qualkey    false    211    210    211         T          0    28144    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          qualkey    false    200       3156.dat \          0    28296    credentialChangeRequests 
   TABLE DATA           �   COPY public."credentialChangeRequests" (uuid, status, "requestedBy", "confirmedBy", "changedFrom", "changedTo", "fieldName", "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    208       3164.dat [          0    28286    credentialChanges 
   TABLE DATA           �   COPY public."credentialChanges" (id, "credentialUuid", "credentialDid", "changedByUuid", "changedFrom", "changedTo", "fieldName", "changedAt", hash, "smartContractId") FROM stdin;
    public          qualkey    false    207       3163.dat Y          0    28275    credentialShares 
   TABLE DATA           �   COPY public."credentialShares" (uuid, "recipientEmails", "credentialUuid", "sharedFields", "temporaryPassword", "expiresAt", "createdAt") FROM stdin;
    public          qualkey    false    205       3161.dat V          0    28245    credentials 
   TABLE DATA           �  COPY public.credentials (uuid, did, status, "studentUuid", "institutionUuid", "uploadUuid", "certificateId", "graduatedName", "authenticatedBy", "qualificationName", majors, minors, "authenticatedTitle", "awardingInstitution", "qualificationLevel", "awardLevel", "studyLanguage", info, "gpaFinalGrade", "authenticatedAt", "studyStartedAt", "studyEndedAt", "graduatedAt", "expiresAt", "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    202       3158.dat `          0    28328    credentialsWithdrawalRequests 
   TABLE DATA           �   COPY public."credentialsWithdrawalRequests" (uuid, "credentialsUuid", "initiatedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    212       3168.dat W          0    28255    institutions 
   TABLE DATA           n   COPY public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    203       3159.dat a          0    28337    oneTimePasswords 
   TABLE DATA           W   COPY public."oneTimePasswords" (uuid, code, "validUntil", "canBeResentAt") FROM stdin;
    public          qualkey    false    213       3169.dat e          0    28365    payments 
   TABLE DATA           �   COPY public.payments (uuid, "externalId", "studentUuid", status, amount, currency, method, "createdAt", "credentialUuids") FROM stdin;
    public          qualkey    false    217       3173.dat b          0    28345    smartContracts 
   TABLE DATA           D   COPY public."smartContracts" (id, status, "deployedAt") FROM stdin;
    public          qualkey    false    214       3170.dat d          0    28355    systemSettings 
   TABLE DATA           U   COPY public."systemSettings" (id, name, value, "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    216       3172.dat ]          0    28306    transactions 
   TABLE DATA           �   COPY public.transactions (uuid, status, "credentialUuid", fee, hash, hex, "smartContractId", "createdAt", "confirmedAt") FROM stdin;
    public          qualkey    false    209       3165.dat X          0    28265    uploads 
   TABLE DATA           �   COPY public.uploads (uuid, filename, "originalFilename", mapping, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt") FROM stdin;
    public          qualkey    false    204       3160.dat _          0    28318    userActions 
   TABLE DATA           }   COPY public."userActions" (id, "userUuid", "initiatorName", type, "subjectUuid", "credentialsUuid", "createdAt") FROM stdin;
    public          qualkey    false    211       3167.dat U          0    28235    users 
   TABLE DATA           �   COPY public.users (uuid, email, password, role, "createdAt", "updatedAt", "lastLoginAt", "firstName", "lastName", currency, "stripeCustomerId", "institutionUuid") FROM stdin;
    public          qualkey    false    201       3157.dat o           0    0    credentialChanges_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."credentialChanges_id_seq"', 22, true);
          public          qualkey    false    206         p           0    0    systemSettings_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."systemSettings_id_seq"', 5, true);
          public          qualkey    false    215         q           0    0    userActions_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."userActions_id_seq"', 1, false);
          public          qualkey    false    210         �           2606    28153 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            qualkey    false    200         �           2606    28305 6   credentialChangeRequests credentialChangeRequests_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public."credentialChangeRequests"
    ADD CONSTRAINT "credentialChangeRequests_pkey" PRIMARY KEY (uuid);
 d   ALTER TABLE ONLY public."credentialChangeRequests" DROP CONSTRAINT "credentialChangeRequests_pkey";
       public            qualkey    false    208         �           2606    28295 (   credentialChanges credentialChanges_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."credentialChanges"
    ADD CONSTRAINT "credentialChanges_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."credentialChanges" DROP CONSTRAINT "credentialChanges_pkey";
       public            qualkey    false    207         �           2606    28283 &   credentialShares credentialShares_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."credentialShares"
    ADD CONSTRAINT "credentialShares_pkey" PRIMARY KEY (uuid);
 T   ALTER TABLE ONLY public."credentialShares" DROP CONSTRAINT "credentialShares_pkey";
       public            qualkey    false    205         �           2606    28336 @   credentialsWithdrawalRequests credentialsWithdrawalRequests_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."credentialsWithdrawalRequests"
    ADD CONSTRAINT "credentialsWithdrawalRequests_pkey" PRIMARY KEY (uuid);
 n   ALTER TABLE ONLY public."credentialsWithdrawalRequests" DROP CONSTRAINT "credentialsWithdrawalRequests_pkey";
       public            qualkey    false    212         �           2606    28254    credentials credentials_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (uuid);
 F   ALTER TABLE ONLY public.credentials DROP CONSTRAINT credentials_pkey;
       public            qualkey    false    202         �           2606    28264    institutions institutions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.institutions
    ADD CONSTRAINT institutions_pkey PRIMARY KEY (uuid);
 H   ALTER TABLE ONLY public.institutions DROP CONSTRAINT institutions_pkey;
       public            qualkey    false    203         �           2606    28344 &   oneTimePasswords oneTimePasswords_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."oneTimePasswords"
    ADD CONSTRAINT "oneTimePasswords_pkey" PRIMARY KEY (uuid);
 T   ALTER TABLE ONLY public."oneTimePasswords" DROP CONSTRAINT "oneTimePasswords_pkey";
       public            qualkey    false    213         �           2606    28375    payments payments_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (uuid);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            qualkey    false    217         �           2606    28364 "   systemSettings systemSettings_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."systemSettings"
    ADD CONSTRAINT "systemSettings_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."systemSettings" DROP CONSTRAINT "systemSettings_pkey";
       public            qualkey    false    216         �           2606    28315    transactions transactions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (uuid);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            qualkey    false    209         �           2606    28274    uploads uploads_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (uuid);
 >   ALTER TABLE ONLY public.uploads DROP CONSTRAINT uploads_pkey;
       public            qualkey    false    204         �           2606    28327    userActions userActions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."userActions"
    ADD CONSTRAINT "userActions_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."userActions" DROP CONSTRAINT "userActions_pkey";
       public            qualkey    false    211         �           2606    28244    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            qualkey    false    201         �           1259    28380    credentialChanges_hash_key    INDEX     c   CREATE UNIQUE INDEX "credentialChanges_hash_key" ON public."credentialChanges" USING btree (hash);
 0   DROP INDEX public."credentialChanges_hash_key";
       public            qualkey    false    207         �           1259    28381 1   credentialsWithdrawalRequests_credentialsUuid_key    INDEX     �   CREATE UNIQUE INDEX "credentialsWithdrawalRequests_credentialsUuid_key" ON public."credentialsWithdrawalRequests" USING btree ("credentialsUuid");
 G   DROP INDEX public."credentialsWithdrawalRequests_credentialsUuid_key";
       public            qualkey    false    212         �           1259    28378    credentials_did_key    INDEX     Q   CREATE UNIQUE INDEX credentials_did_key ON public.credentials USING btree (did);
 '   DROP INDEX public.credentials_did_key;
       public            qualkey    false    202         �           1259    28379    institutions_emailDomain_key    INDEX     g   CREATE UNIQUE INDEX "institutions_emailDomain_key" ON public.institutions USING btree ("emailDomain");
 2   DROP INDEX public."institutions_emailDomain_key";
       public            qualkey    false    203         �           1259    28384    payments_externalId_key    INDEX     ]   CREATE UNIQUE INDEX "payments_externalId_key" ON public.payments USING btree ("externalId");
 -   DROP INDEX public."payments_externalId_key";
       public            qualkey    false    217         �           1259    28382    smartContracts_id_key    INDEX     Y   CREATE UNIQUE INDEX "smartContracts_id_key" ON public."smartContracts" USING btree (id);
 +   DROP INDEX public."smartContracts_id_key";
       public            qualkey    false    214         �           1259    28383    systemSettings_name_key    INDEX     ]   CREATE UNIQUE INDEX "systemSettings_name_key" ON public."systemSettings" USING btree (name);
 -   DROP INDEX public."systemSettings_name_key";
       public            qualkey    false    216         �           1259    28376    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            qualkey    false    201         �           1259    28377    users_stripeCustomerId_key    INDEX     c   CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON public.users USING btree ("stripeCustomerId");
 0   DROP INDEX public."users_stripeCustomerId_key";
       public            qualkey    false    201         �           2606    28405 7   credentialChanges credentialChanges_credentialUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."credentialChanges"
    ADD CONSTRAINT "credentialChanges_credentialUuid_fkey" FOREIGN KEY ("credentialUuid") REFERENCES public.credentials(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 e   ALTER TABLE ONLY public."credentialChanges" DROP CONSTRAINT "credentialChanges_credentialUuid_fkey";
       public          qualkey    false    207    2990    202         �           2606    28395 ,   credentials credentials_institutionUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY public.credentials DROP CONSTRAINT "credentials_institutionUuid_fkey";
       public          qualkey    false    203    2993    202         �           2606    28390 (   credentials credentials_studentUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.credentials DROP CONSTRAINT "credentials_studentUuid_fkey";
       public          qualkey    false    2986    202    201         �           2606    28400 '   credentials credentials_uploadUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_uploadUuid_fkey" FOREIGN KEY ("uploadUuid") REFERENCES public.uploads(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.credentials DROP CONSTRAINT "credentials_uploadUuid_fkey";
       public          qualkey    false    2995    202    204         �           2606    28415 "   payments payments_studentUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.payments DROP CONSTRAINT "payments_studentUuid_fkey";
       public          qualkey    false    2986    217    201         �           2606    28410 .   transactions transactions_smartContractId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_smartContractId_fkey" FOREIGN KEY ("smartContractId") REFERENCES public."smartContracts"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Z   ALTER TABLE ONLY public.transactions DROP CONSTRAINT "transactions_smartContractId_fkey";
       public          qualkey    false    209    3012    214         �           2606    28385     users users_institutionUuid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_institutionUuid_fkey";
       public          qualkey    false    203    201    2993                                                                                                                                                                                                                                                                                                                                                                        3156.dat                                                                                            0000600 0004000 0002000 00000001734 14247262364 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        7d1fa6b5-76b0-41b3-b63c-8f4fd791a5ed	96ef949e094f5111b82b8f6e018bb4b51d616119309376818574e96936f416f6	2022-06-06 01:10:09.815866+00	20220606011009_	\N	\N	2022-06-06 01:10:09.443121+00	1
4b425046-2386-4116-8618-7c3b9b605d7e	75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0	2022-04-27 21:27:52.781552+00	20220427134050_init	\N	\N	2022-04-27 21:27:52.769912+00	1
c694e44f-e28c-4a3b-b6bb-545dcb94d1f3	75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0	2022-04-27 13:48:56.073734+00	20220427134050_init	\N	\N	2022-04-27 13:48:56.052726+00	1
f7c4efdb-ad07-4bbf-95b3-3fe640a30f54	7f6c78e32d7eb2466d6e4ca9e1ba0ca17018f92e5703915ee06263133cc4d1e4	2022-05-06 15:36:27.156577+00	20220429224530_update_models_30_04	\N	\N	2022-05-06 15:36:27.120806+00	1
13f5e6ea-245c-4525-859f-458316a5f037	56f3d4090d8f90c1381da67d2da5ef43a843690c0e19de0405c285db4a8a6592	2022-05-06 15:36:27.163625+00	20220429225129_update_models_30_04_defaults	\N	\N	2022-05-06 15:36:27.1593+00	1
\.


                                    3164.dat                                                                                            0000600 0004000 0002000 00000000005 14247262364 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3163.dat                                                                                            0000600 0004000 0002000 00000014054 14247262364 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1863b022-19c7-4484-b555-a7f9e194adc2	did:hedera:testnet:CZxrT66uG6E2Vy2Yyxsuhdd4HSPDZWmzjE7q6fLjnsfa;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:00:25.648	72fa5fe76009eb586c472baf2fb648f92aed89a36a7321097bacfada33aab5a2	0.0.45904185
2	c553d71d-303b-46e2-bbd9-88071e5dfbe0	did:hedera:testnet:2fV3r89pRBqPeHjk71vEiiAYg63HemPZgjXVGvtNw7JM;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:00:32.724	28d3363cf5c19ad9a27808e6d3b668cae9a2aed4b44cc6f7f7833ad3ddad1d0c	0.0.45904185
3	d8a32e09-312e-4187-9b10-7a77822aeace	did:hedera:testnet:BuyTi2fDmU6TGUcx6pAwrrthwPi3QouvGMyZ8oEu2zaH;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:00:41.414	bd0628ea5ac9be0598615854d1e1cb1d164fe172e155cbe23f145fb1a95a8d5a	0.0.45904185
4	97eb98d0-1646-4e36-bd40-5c6d0ed131bd	did:hedera:testnet:Fer77b7VDqdyinPVqrDhuTjPRXt1493zm6rAd3XPa8KM;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:00:47.842	be21b9c2768accc1d3143851cd332538817ef0b3c1c4eda3ef96494270872eb6	0.0.45904185
5	9493d456-b4e6-47e0-ad22-2f3a599b2d91	did:hedera:testnet:34W17uTR1gvrheKjFFEk1VgrLkMJn8NDa2Zh4a6pon2h;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:00:54.655	1de29ff8f5bd5735f2de7d57d3698193fd05fbbad2f0d73cdbd6fd484327ebd4	0.0.45904185
6	12bd6800-2a52-4f21-a4b6-39ac38ff75c8	did:hedera:testnet:6dAEN8nXmuzGuNjSBf7KMiBzHtWghpLmYRjNwtPWGjNy;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:00.938	d3cc8d8c9f657fb8bab84a48a562ae5a3460ca19a2d1f079a2441016205490fa	0.0.45904185
7	573b2ddd-431f-4276-a943-c9c31ffa0857	did:hedera:testnet:AnuSPcKqaXZFDRYRNVszRQGvccD3SPuPZvHYfr1Gfoxd;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:07.497	15c781d51e6157eef306da107334ae3a95eeb32c849125a5030917bbe8c68884	0.0.45904185
8	d94fdf89-f473-4f6a-b852-8166cdd5673c	did:hedera:testnet:H7N2bdouZhCi57xEfJJeVkyGo2iVPEpSt8VomE2pM7JQ;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:24.037	6bf68458b7e511d8e7c23ed92ee45e104fd92f21c360e731c4c25e26c1e05a50	0.0.45904185
9	e6f2bc7f-e74d-4b75-a55d-35a003c2c8bc	did:hedera:testnet:89tHsGLdD456pC23grpYDAy1sgt98UqYQYGeB9CwJzeg;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:30.937	0bbd3386c151335b1e7daecee994023af4133abace653a3d0a3dbd3fc08cf907	0.0.45904185
10	be45d4b3-105c-4e63-9eb4-17a3e1501685	did:hedera:testnet:76UjFScXNPv3FCnwf7gy8wpS9frPVUxjQEenNNhT858p;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:37.636	476aece2a9b1fad2e58a5ac0fc5b4b51f18c3dc4e58a80485384ce64074804b4	0.0.45904185
11	65e95b5e-4756-48f4-9cb6-7eb799140de5	did:hedera:testnet:69YckKkeykukVp1gydTTdjhX5Mqwn15iZVomoTTL6Fdx;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:44.041	198f5376d61210171b839bee15d93328ba98ef2ce09e7d5f45a4336b130d6c02	0.0.45904185
12	fb5a05c7-9085-4030-b6ce-d0e423835b14	did:hedera:testnet:129u1mxnvma6hgkEwbpVPgx5o5vnJpxvDYzsRt2QYrM8;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:50.756	dce0d27a6d2f1e50b2615b9702863f8c42a4246899fe99090d55ec7fdb1236d1	0.0.45904185
13	741f7bc5-f23e-4dff-9f8b-5c413654319c	did:hedera:testnet:E7sJrr3jnQFS3EpeKd4Rb6HUiq5C9rFeM5yx4kfS6UbP;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:01:58.201	c1ce59e541dd7542482340b56d873ab6e03d52ccbba6a36499123596354fe8d2	0.0.45904185
14	858e4e66-1d0c-4c8b-9afc-14a6668b250f	did:hedera:testnet:BE7Y6VcqzYtfAM25VJM3VeovztmNmGfcYLczpXRPJqgc;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:02:04.637	78e34dde333ed33e4006f143aad20094c29a7ee1cbe460317c42e43d1113d3c2	0.0.45904185
15	7198da65-5989-4e02-a65d-7220fa0ed66d	did:hedera:testnet:9AdcbhEv3VHrJwLkYdETFC3Qq15NXy8BKxzZjs7mPepy;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:02:11.419	5fc0210e8ca921a8989f4f6571e831c46a304ed867bf3facb363c599cf73519d	0.0.45904185
16	2ea56535-6b65-484b-b9d4-c438904479ef	did:hedera:testnet:FK5bWLft6K6R7V4W9tz5k4Hn41W7aAUsh7UBSscf1HpN;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:02:17.937	cbd5e48b7b013e520b2fa73cdad9783c182dcd5fe66555b05f1e5011e456ff8f	0.0.45904185
18	ad27fd9d-259c-4e77-a359-287fe89ca721	did:hedera:testnet:3zFGvXxcDPKeTTarAqWVG7m4CCmSFRiuR2SeUCyB9gjP;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:03:48.772	fa348d45aa8607e6d870cc57a8b287660a22b0b70be9d70bcea64f7ce7d0ee13	0.0.45904185
17	26daab03-4711-4d44-ace9-5d14be4b8271	did:hedera:testnet:4B3zPCcLEMptxCxbT7DpUED4m5u5kRzZTtv3A3pZXqmB;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:02:25.648	b47ed598182f84b59e25cf391052a553c078e721810a44c14e3e428f35811494	
20	9f7d55a4-ab53-412d-9188-61b3f6d18eca	did:hedera:testnet:4LkDADUhxphik2T3cEsf9rU2LdUR8bNVeDTcoEEXVq8W;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:04:03.789	7439bf51790cf089c0b4554e4f28d6b63b3f415745227d21628dfcb40cd940b6	0.0.45904185
21	1c270399-4b8c-4d66-a99c-736c9b1d51e1	did:hedera:testnet:4TtcmqPf5vLSc1bUG8vvisD7aFana74HbDuqyM8DEDxS;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:04:10.305	d211f5144bd7b62286ea56c2706e94de52f7a0d2d3a3d8ee8611a76478252bc0	0.0.45904185
22	d4366c3e-c97c-4268-8fd6-04fe22038788	did:hedera:testnet:89qABEWCnkS6GNo5hmK4gSbstRA1oHKMHjiH2YJoQUex;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:04:16.782	aef88b1b036ec1ab4c13b2a1371d3f072f42aaad6b7d4d1c5df463ac7b0245b5	0.0.45904185
19	a1a0cdb2-e0ed-46c2-8548-71a7a5a18b96	did:hedera:testnet:8xmfbmbAxMLrr6yTR4d4oBP2nThfgNvfVr1cVH8seoFh;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	\N	\N	\N	\N	2022-06-06 02:03:56.799	7b3d2f040502afb174e5f757a39189909c11ee23d02d09d7d1f0478333d7c04a	0.0.45904185
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    3161.dat                                                                                            0000600 0004000 0002000 00000000005 14247262364 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3158.dat                                                                                            0000600 0004000 0002000 00000026702 14247262364 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        e6f2bc7f-e74d-4b75-a55d-35a003c2c8bc	did:hedera:testnet:89tHsGLdD456pC23grpYDAy1sgt98UqYQYGeB9CwJzeg;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	e5c84c0c-ce22-49f2-ab88-7ae7a3457c64	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Lucy Stahl	\N	Bachelor of Science		\N	\N	University of Beispiel	Bachelors		English	None		\N	2016-08-15 00:00:00	2019-08-10 00:00:00	2020-08-15 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:30.925	2022-06-06 02:01:32.571
1863b022-19c7-4484-b555-a7f9e194adc2	did:hedera:testnet:CZxrT66uG6E2Vy2Yyxsuhdd4HSPDZWmzjE7q6fLjnsfa;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	35f5243f-e3b7-4a61-b137-0f3871e1589c	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	John Doe	\N	Master of Business Administration		\N	\N	College of Example	Bachelors		English	None		\N	2020-01-11 19:00:00	2021-01-11 19:00:00	2021-05-05 00:00:00	2021-12-03 10:00:00	2022-06-06 02:00:25.627	2022-06-06 02:00:27.475
12bd6800-2a52-4f21-a4b6-39ac38ff75c8	did:hedera:testnet:6dAEN8nXmuzGuNjSBf7KMiBzHtWghpLmYRjNwtPWGjNy;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	91e892a6-6436-4b37-8ea7-b36fe531af48	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Dylan Bomstein	\N	Bachelors of International Testing	Business	\N	\N	Learning Institute	Masters	Honors	English	None	123124125	\N	2019-09-15 00:00:00	2021-06-05 00:00:00	2021-05-05 00:00:00	2021-12-03 10:00:00	2022-06-06 02:01:00.916	2022-06-06 02:01:02.328
c553d71d-303b-46e2-bbd9-88071e5dfbe0	did:hedera:testnet:2fV3r89pRBqPeHjk71vEiiAYg63HemPZgjXVGvtNw7JM;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	91e892a6-6436-4b37-8ea7-b36fe531af48	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Dylan Bomstein	\N	Bachelors of Science in Business	Finance & Marketing	\N	\N	Learning Institute	Bachelors		English	None		\N	2013-08-05 00:00:00	2017-05-05 00:00:00	2017-05-05 10:00:00	2021-12-03 10:00:00	2022-06-06 02:00:32.713	2022-06-06 02:00:36.223
d8a32e09-312e-4187-9b10-7a77822aeace	did:hedera:testnet:BuyTi2fDmU6TGUcx6pAwrrthwPi3QouvGMyZ8oEu2zaH;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	bae223f8-67ba-4650-9154-c3bfb18c5d4e	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Jessica Travers	\N	Masters in Innovation		\N	\N	Learning Institute	Bachelors		English	None		\N	2013-08-05 00:00:00	2017-05-04 00:00:00	2021-05-05 00:00:00	2021-12-03 10:00:00	2022-06-06 02:00:41.401	2022-06-06 02:00:42.779
97eb98d0-1646-4e36-bd40-5c6d0ed131bd	did:hedera:testnet:Fer77b7VDqdyinPVqrDhuTjPRXt1493zm6rAd3XPa8KM;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	91e892a6-6436-4b37-8ea7-b36fe531af48	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Dylan Bomstein	\N	Masters of Business Administration		\N	\N	Learning Institute	Bachelors		English	None		\N	2017-08-07 00:00:00	2021-05-19 00:00:00	2021-05-05 00:00:00	2021-12-03 10:00:00	2022-06-06 02:00:47.828	2022-06-06 02:00:49.598
573b2ddd-431f-4276-a943-c9c31ffa0857	did:hedera:testnet:AnuSPcKqaXZFDRYRNVszRQGvccD3SPuPZvHYfr1Gfoxd;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	2d26ca8a-fb05-4393-91ba-9db26ce59e45	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	John Cena	\N	Bachelors of Science	None	\N	\N	Uni Muster	Bachelors	Honors	English	None	123-5125-12	\N	2000-03-12 00:00:00	2004-05-12 00:00:00	2004-05-12 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:07.485	2022-06-06 02:01:08.846
9493d456-b4e6-47e0-ad22-2f3a599b2d91	did:hedera:testnet:34W17uTR1gvrheKjFFEk1VgrLkMJn8NDa2Zh4a6pon2h;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	91e892a6-6436-4b37-8ea7-b36fe531af48	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Dylan Bomstein	\N	Bachelors of Science in Science	Marketing & Finance	\N	\N	Learning Institute	Bachelors	Honors	English	None	12315125	\N	2013-09-12 00:00:00	2017-05-06 00:00:00	2017-05-06 00:00:00	2021-12-03 10:00:00	2022-06-06 02:00:54.642	2022-06-06 02:00:55.87
65e95b5e-4756-48f4-9cb6-7eb799140de5	did:hedera:testnet:69YckKkeykukVp1gydTTdjhX5Mqwn15iZVomoTTL6Fdx;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	e5c84c0c-ce22-49f2-ab88-7ae7a3457c64	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Lucy Stahl	\N	Master of Engineering		\N	\N	Uni Muster	Bachelors		English	None		\N	2020-09-14 00:00:00	2021-07-21 00:00:00	2021-05-05 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:44.027	2022-06-06 02:01:45.576
d94fdf89-f473-4f6a-b852-8166cdd5673c	did:hedera:testnet:H7N2bdouZhCi57xEfJJeVkyGo2iVPEpSt8VomE2pM7JQ;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	e5c84c0c-ce22-49f2-ab88-7ae7a3457c64	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Lucy Stahl	\N	Master of Business Administration	Business Analysis	\N	\N	College of Example	Masters		English	Award for Growth Mindset		\N	2019-09-01 00:00:00	2020-07-01 00:00:00	2001-08-01 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:24.028	2022-06-06 02:01:25.799
be45d4b3-105c-4e63-9eb4-17a3e1501685	did:hedera:testnet:76UjFScXNPv3FCnwf7gy8wpS9frPVUxjQEenNNhT858p;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	e5c84c0c-ce22-49f2-ab88-7ae7a3457c64	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Lucy Stahl	\N	Bachelor of Engineering		\N	\N	University of Beispiel	Bachelors		English	None		\N	2012-09-13 00:00:00	2015-07-01 00:00:00	2015-08-10 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:37.61	2022-06-06 02:01:38.972
fb5a05c7-9085-4030-b6ce-d0e423835b14	did:hedera:testnet:129u1mxnvma6hgkEwbpVPgx5o5vnJpxvDYzsRt2QYrM8;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	17db435d-41d9-4e59-8dce-8ac9be853c78	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Paul Smith	\N	Master of Science		\N	\N	University of Beispiel	Bachelors		English	None		\N	2020-10-01 00:00:00	2021-07-31 00:00:00	2021-05-05 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:50.745	2022-06-06 02:01:53.023
858e4e66-1d0c-4c8b-9afc-14a6668b250f	did:hedera:testnet:BE7Y6VcqzYtfAM25VJM3VeovztmNmGfcYLczpXRPJqgc;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	421ef9a8-ed42-4ea6-8bd2-1db5115f6b52	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Samantha Sullis	\N	Master of Engineering		\N	\N	College of Example	Bachelors		English	None		\N	2020-10-01 00:00:00	2020-07-31 00:00:00	2021-05-05 00:00:00	2030-12-06 00:00:00	2022-06-06 02:02:04.625	2022-06-06 02:02:06.229
741f7bc5-f23e-4dff-9f8b-5c413654319c	did:hedera:testnet:E7sJrr3jnQFS3EpeKd4Rb6HUiq5C9rFeM5yx4kfS6UbP;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	6156be53-4fbe-451e-ac2c-8bfb1ba257f1	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Meggie McDonald	\N	Master of Science		\N	\N	University of Beispiel	Bachelors		English	None		\N	2020-10-01 00:00:00	2021-07-31 00:00:00	2021-05-05 00:00:00	2030-12-06 00:00:00	2022-06-06 02:01:58.189	2022-06-06 02:01:59.462
7198da65-5989-4e02-a65d-7220fa0ed66d	did:hedera:testnet:9AdcbhEv3VHrJwLkYdETFC3Qq15NXy8BKxzZjs7mPepy;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	9ad79972-0ca4-4da4-a2ad-b9f774ad2e47	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Tomo Mazura	\N	Master of Business Administration		\N	\N	University of Beispiel	Bachelors		English	None		\N	2020-10-01 00:00:00	2015-08-01 00:00:00	2019-08-15 00:00:00	2030-12-06 00:00:00	2022-06-06 02:02:11.405	2022-06-06 02:02:12.774
2ea56535-6b65-484b-b9d4-c438904479ef	did:hedera:testnet:FK5bWLft6K6R7V4W9tz5k4Hn41W7aAUsh7UBSscf1HpN;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	4480a80f-8ecd-4dbf-b102-1fe1eee4c65e	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Maria Keks	\N	Bachelor of Science		\N	\N	University of Beispiel	Bachelors		English	None		\N	2019-09-01 00:00:00	2020-07-01 00:00:00	2020-07-15 00:00:00	2030-12-06 00:00:00	2022-06-06 02:02:17.927	2022-06-06 02:02:20.459
26daab03-4711-4d44-ace9-5d14be4b8271	did:hedera:testnet:4B3zPCcLEMptxCxbT7DpUED4m5u5kRzZTtv3A3pZXqmB;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADING_TO_BLOCKCHAIN	f3497e89-c0f2-4e09-b58f-aa843d0a6501	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Achmed Tizi	\N	Bachelor of Engineering		\N	\N	University of Beispiel	Bachelors		English	None		\N	2016-08-15 00:00:00	2019-08-10 00:00:00	2019-08-15 00:00:00	2030-12-06 00:00:00	2022-06-06 02:02:25.627	2022-06-06 02:02:25.659
a1a0cdb2-e0ed-46c2-8548-71a7a5a18b96	did:hedera:testnet:8xmfbmbAxMLrr6yTR4d4oBP2nThfgNvfVr1cVH8seoFh;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	9660ec30-7bcc-4a22-9dcc-104ebb49ebf1	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Klaus Lustig	\N	Master of Science		\N	\N	University of Beispiel	Masters		English	None		\N	2016-08-15 00:00:00	2019-08-10 00:00:00	2019-08-15 00:00:00	2030-12-06 00:00:00	2022-06-06 02:03:56.788	2022-06-06 02:03:58.608
9f7d55a4-ab53-412d-9188-61b3f6d18eca	did:hedera:testnet:4LkDADUhxphik2T3cEsf9rU2LdUR8bNVeDTcoEEXVq8W;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	8c5c0b47-6988-4e38-8184-9422a871c7d4	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Paul Easy	\N	Master of Engineering		\N	\N	University of Beispiel	Masters		English	None		\N	2019-09-01 00:00:00	2020-07-01 00:00:00	2020-07-15 00:00:00	2030-12-06 00:00:00	2022-06-06 02:04:03.779	2022-06-06 02:04:05.111
1c270399-4b8c-4d66-a99c-736c9b1d51e1	did:hedera:testnet:4TtcmqPf5vLSc1bUG8vvisD7aFana74HbDuqyM8DEDxS;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	ba590b30-627f-4285-ba12-64ec69521995	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Isabelle Portre	\N	Master of Engineering		\N	\N	University of Beispiel	Masters		English	None		\N	2020-09-14 00:00:00	2021-07-21 00:00:00	2021-07-26 00:00:00	2030-12-06 00:00:00	2022-06-06 02:04:10.282	2022-06-06 02:04:11.721
d4366c3e-c97c-4268-8fd6-04fe22038788	did:hedera:testnet:89qABEWCnkS6GNo5hmK4gSbstRA1oHKMHjiH2YJoQUex;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	e5c84c0c-ce22-49f2-ab88-7ae7a3457c64	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Lucy Stahl	\N	Masters of Business Administration		\N	\N	Learning Institute	Masters		English	None		\N	2011-07-15 00:00:00	2013-03-02 00:00:00	2004-05-12 00:00:00	2030-12-06 00:00:00	2022-06-06 02:04:16.76	2022-06-06 02:04:19.157
ad27fd9d-259c-4e77-a359-287fe89ca721	did:hedera:testnet:3zFGvXxcDPKeTTarAqWVG7m4CCmSFRiuR2SeUCyB9gjP;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760	UPLOADED_TO_BLOCKCHAIN	ef88328c-ea99-408f-927c-abea1516cd89	89f43c8f-1434-4caf-92bd-990b3f112da1	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	\N	Nadja Bespalova	\N	Master of Engineering		\N	\N	University of Beispiel	Masters		English	None		\N	2012-09-13 00:00:00	2015-07-01 00:00:00	2015-08-01 00:00:00	2030-12-06 00:00:00	2022-06-06 02:03:48.761	2022-06-06 02:18:50.578
\.


                                                              3168.dat                                                                                            0000600 0004000 0002000 00000000005 14247262364 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3159.dat                                                                                            0000600 0004000 0002000 00000000153 14247262364 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        89f43c8f-1434-4caf-92bd-990b3f112da1	ACTIVE	web3app	\N	Testio	2022-05-08 22:37:57	2022-05-08 22:37:59
\.


                                                                                                                                                                                                                                                                                                                                                                                                                     3169.dat                                                                                            0000600 0004000 0002000 00000000555 14247262364 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        58ab1299-2491-4b36-9338-d4576aae4b30	3294	2022-06-06 01:56:34.418	2022-06-06 01:55:49.418
fa7df195-763f-4538-99de-ac0da1e4b10d	3766	2022-06-06 01:59:01.058	2022-06-06 01:58:16.058
cc9c6507-2b4c-41c2-9fc6-fe34d54cb27a	0304	2022-06-06 01:59:01.773	2022-06-06 01:58:16.773
a2011c9e-6756-4a35-9db6-49d99009ee51	1737	2022-06-06 02:00:09.975	2022-06-06 01:59:24.975
\.


                                                                                                                                                   3173.dat                                                                                            0000600 0004000 0002000 00000001636 14247262364 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        32418e5d-0a8b-4145-9a15-7b4e0aa28790	cs_test_a1rNpOqOxnPvMzIZToLz34t0q5IPs1X9IACDl2WQlN5krrpUFTZmPjROzL	ef88328c-ea99-408f-927c-abea1516cd89	COMPLETED	1999.00	GBP	card	2022-06-06 02:06:27.497	{ad27fd9d-259c-4e77-a359-287fe89ca721}
b15f4ee6-79ab-43bf-82d3-e6d18f8e22c3	cs_test_a1Ap6wxdCBH7We9CKO3j8rF7r3NcMJD4YPdWK9XepsYYaG6f0iyiLuSmvW	ef88328c-ea99-408f-927c-abea1516cd89	COMPLETED	1999.00	GBP	card	2022-06-06 02:16:15.401	{ad27fd9d-259c-4e77-a359-287fe89ca721}
5103fc8d-724a-4f03-a7ef-888e8d4c4c19	cs_test_a1d1kcdlfYEq5sskOiCskkthQ0hf6NhHaosTIGmuqidUiyUCXL0irVj7Jc	ef88328c-ea99-408f-927c-abea1516cd89	COMPLETED	1999.00	GBP	card	2022-06-06 02:18:31.47	{ad27fd9d-259c-4e77-a359-287fe89ca721}
21ce2851-1f10-422e-b00e-221bc75232d7	cs_test_a1ISh8akFhJrx7JmGj44oQX4h07Y6jg5Rt2mu8e8N6R4jOqh0Cv3vYXBfi	ef88328c-ea99-408f-927c-abea1516cd89	PENDING	1999.00	GBP	card	2022-06-06 02:19:12.182	{ad27fd9d-259c-4e77-a359-287fe89ca721}
\.


                                                                                                  3170.dat                                                                                            0000600 0004000 0002000 00000000061 14247262364 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        0.0.45904185	ACTIVE	2022-06-06 01:21:09.758
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                               3172.dat                                                                                            0000600 0004000 0002000 00000000703 14247262364 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	otp.enabled	false	2022-06-06 01:57:01.199	2022-06-06 01:57:01.2
2	emails.enabled	false	2022-06-06 01:57:11.954	2022-06-06 01:57:11.954
3	credentials.price.usd	price_1L76C9HqmckIsQHkMYL35Dxs	2022-06-06 01:58:07.615	2022-06-06 01:58:07.616
4	credentials.price.eur	price_1L76BmHqmckIsQHkJUAasgDe	2022-06-06 01:58:27.716	2022-06-06 01:58:27.716
5	credentials.price.gbp	price_1L75fKHqmckIsQHkjpohDUvr	2022-06-06 01:58:43.588	2022-06-06 01:58:43.588
\.


                                                             3165.dat                                                                                            0000600 0004000 0002000 00000000005 14247262364 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3160.dat                                                                                            0000600 0004000 0002000 00000000614 14247262364 0014256 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7	d1083296-dbe4-4cb5-9b86-6a8fc2ee27c7.csv	Новая таблица - qk.csv	graduatedName,,awardLevel,expiresAt,studyLanguage,qualificationLevel,info,qualificationName,awardingInstitution,majors,email,gpaFinalGrade,,graduatedAt,studyStartedAt,studyEndedAt	APPROVED	4728859d-622b-4ec0-8f60-75caa0d17c13		\N	2022-06-06 02:00:24.988	2022-06-06 02:00:25.007
\.


                                                                                                                    3167.dat                                                                                            0000600 0004000 0002000 00000000005 14247262364 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3157.dat                                                                                            0000600 0004000 0002000 00000007051 14247262364 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        bf4fe6f3-f5a1-4794-aced-4deb4ba8c67a	student@student.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-04-28 10:35:09.983	2022-04-28 10:35:09.983	\N	Student	Student	GBP	\N	\N
00e5daba-fd08-4146-af73-deb67e6dd2ea	admin@admin.com	$2a$10$6X/3no1.v5A3ygHPMGF7a.FKaOa2TkekqsWIq9ADRBOOm8Y1CcrgW	SUPER_ADMIN	2022-04-27 22:10:57	2022-04-27 22:11:34	\N	Admin	Admin	GBP	\N	\N
4728859d-622b-4ec0-8f60-75caa0d17c13	institution@institution.com	$2a$10$vz2liRFu3Ho7rLdEInKO5./ZjUsynDfhLTuaIRqdNLh0ewCfILZKG	INSTITUTION_REPRESENTATIVE	2022-04-28 10:36:50.567	2022-06-06 01:59:11.696	2022-06-06 01:59:11.689	Institution	Institution	GBP	\N	89f43c8f-1434-4caf-92bd-990b3f112da1
91e892a6-6436-4b37-8ea7-b36fe531af48	igorakaargregor@gmail.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:00:32.682	2022-06-06 02:00:32.683	\N	\N	\N	GBP	\N	\N
8c5c0b47-6988-4e38-8184-9422a871c7d4	easypaul@yahoo.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:04:03.744	2022-06-06 02:04:03.745	\N	\N	\N	GBP	\N	\N
ba590b30-627f-4285-ba12-64ec69521995	isabella@mail.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:04:10.26	2022-06-06 02:04:10.261	\N	\N	\N	GBP	\N	\N
e5c84c0c-ce22-49f2-ab88-7ae7a3457c64	demostudent@gmail.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:01:24.006	2022-06-06 02:01:24.007	\N	\N	\N	GBP	\N	\N
9660ec30-7bcc-4a22-9dcc-104ebb49ebf1	lustigerklavs@mail.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:03:56.744	2022-06-06 02:03:56.745	\N	\N	\N	GBP	\N	\N
f3497e89-c0f2-4e09-b58f-aa843d0a6501	ahmed@email.ocm	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:02:25.602	2022-06-06 02:02:25.603	\N	\N	\N	GBP	\N	\N
9ad79972-0ca4-4da4-a2ad-b9f774ad2e47	tomomazura@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:02:11.367	2022-06-06 02:02:11.368	\N	\N	\N	GBP	\N	\N
17db435d-41d9-4e59-8dce-8ac9be853c78	paulsmith@gmail.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:01:50.724	2022-06-06 02:01:50.725	\N	\N	\N	GBP	\N	\N
35f5243f-e3b7-4a61-b137-0f3871e1589c	johndoe@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:00:25.542	2022-06-06 02:00:25.543	\N	\N	\N	GBP	\N	\N
4480a80f-8ecd-4dbf-b102-1fe1eee4c65e	marja@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:02:17.904	2022-06-06 02:02:17.905	\N	\N	\N	GBP	\N	\N
6156be53-4fbe-451e-ac2c-8bfb1ba257f1	meggiemcdonald@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:01:58.164	2022-06-06 02:01:58.164	\N	\N	\N	GBP	\N	\N
2d26ca8a-fb05-4393-91ba-9db26ce59e45	johncena@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:01:07.461	2022-06-06 02:01:07.462	\N	\N	\N	GBP	\N	\N
421ef9a8-ed42-4ea6-8bd2-1db5115f6b52	samantha@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:02:04.6	2022-06-06 02:02:04.601	\N	\N	\N	GBP	\N	\N
bae223f8-67ba-4650-9154-c3bfb18c5d4e	jessicatravers@email.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:00:41.362	2022-06-06 02:00:41.363	\N	\N	\N	GBP	\N	\N
ef88328c-ea99-408f-927c-abea1516cd89	nadjka@emial.com	$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.	STUDENT	2022-06-06 02:03:48.738	2022-06-06 02:07:36.992	2022-06-06 02:06:13.067	\N	\N	GBP	cus_Lp9fjGTzZ87QGF	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       restore.sql                                                                                         0000600 0004000 0002000 00000065000 14247262364 0015377 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
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
    'WITHDRAWN',
    'EXPIRED'
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
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);


ALTER TYPE public."PaymentStatus" OWNER TO qualkey;

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
-- Name: SmartContractStatus; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."SmartContractStatus" AS ENUM (
    'ACTIVE',
    'STORAGE_EXCEEDED'
);


ALTER TYPE public."SmartContractStatus" OWNER TO qualkey;

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

--
-- Name: UserActionType; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."UserActionType" AS ENUM (
    'REVIEW_UPLOAD',
    'REVIEW_WITHDRAWAL',
    'REVIEW_CHANGE_REQUEST'
);


ALTER TYPE public."UserActionType" OWNER TO qualkey;

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
    "credentialDid" text NOT NULL,
    "changedByUuid" text,
    "changedFrom" text,
    "changedTo" text,
    "fieldName" text,
    "changedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hash text NOT NULL,
    "smartContractId" text
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
    "recipientEmails" text NOT NULL,
    "credentialUuid" text NOT NULL,
    "sharedFields" text NOT NULL,
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
    status public."CredentialStatus" DEFAULT 'NEW'::public."CredentialStatus" NOT NULL,
    "studentUuid" text NOT NULL,
    "institutionUuid" text NOT NULL,
    "uploadUuid" text NOT NULL,
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
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.credentials OWNER TO qualkey;

--
-- Name: credentialsWithdrawalRequests; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."credentialsWithdrawalRequests" (
    uuid text NOT NULL,
    "credentialsUuid" text NOT NULL,
    "initiatedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."credentialsWithdrawalRequests" OWNER TO qualkey;

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
-- Name: oneTimePasswords; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."oneTimePasswords" (
    uuid text NOT NULL,
    code text NOT NULL,
    "validUntil" timestamp(3) without time zone NOT NULL,
    "canBeResentAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."oneTimePasswords" OWNER TO qualkey;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.payments (
    uuid text NOT NULL,
    "externalId" text NOT NULL,
    "studentUuid" text NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    amount numeric(10,2) DEFAULT 0.00 NOT NULL,
    currency text NOT NULL,
    method text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "credentialUuids" text[]
);


ALTER TABLE public.payments OWNER TO qualkey;

--
-- Name: smartContracts; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."smartContracts" (
    id text NOT NULL,
    status public."SmartContractStatus" DEFAULT 'ACTIVE'::public."SmartContractStatus" NOT NULL,
    "deployedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."smartContracts" OWNER TO qualkey;

--
-- Name: systemSettings; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."systemSettings" (
    id integer NOT NULL,
    name text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."systemSettings" OWNER TO qualkey;

--
-- Name: systemSettings_id_seq; Type: SEQUENCE; Schema: public; Owner: qualkey
--

CREATE SEQUENCE public."systemSettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."systemSettings_id_seq" OWNER TO qualkey;

--
-- Name: systemSettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qualkey
--

ALTER SEQUENCE public."systemSettings_id_seq" OWNED BY public."systemSettings".id;


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
    "smartContractId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "confirmedAt" timestamp(3) without time zone
);


ALTER TABLE public.transactions OWNER TO qualkey;

--
-- Name: uploads; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.uploads (
    uuid text NOT NULL,
    filename text NOT NULL,
    "originalFilename" text NOT NULL,
    mapping text NOT NULL,
    status public."UploadStatus" DEFAULT 'PENDING'::public."UploadStatus" NOT NULL,
    "uploadedBy" text NOT NULL,
    "confirmationsRequestedFrom" text NOT NULL,
    "confirmedBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.uploads OWNER TO qualkey;

--
-- Name: userActions; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public."userActions" (
    id integer NOT NULL,
    "userUuid" text NOT NULL,
    "initiatorName" text NOT NULL,
    type public."UserActionType" NOT NULL,
    "subjectUuid" text NOT NULL,
    "credentialsUuid" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."userActions" OWNER TO qualkey;

--
-- Name: userActions_id_seq; Type: SEQUENCE; Schema: public; Owner: qualkey
--

CREATE SEQUENCE public."userActions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userActions_id_seq" OWNER TO qualkey;

--
-- Name: userActions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qualkey
--

ALTER SEQUENCE public."userActions_id_seq" OWNED BY public."userActions".id;


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
    "lastLoginAt" timestamp(3) without time zone,
    "firstName" text,
    "lastName" text,
    currency text DEFAULT 'GBP'::text NOT NULL,
    "stripeCustomerId" text,
    "institutionUuid" text
);


ALTER TABLE public.users OWNER TO qualkey;

--
-- Name: credentialChanges id; Type: DEFAULT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChanges" ALTER COLUMN id SET DEFAULT nextval('public."credentialChanges_id_seq"'::regclass);


--
-- Name: systemSettings id; Type: DEFAULT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."systemSettings" ALTER COLUMN id SET DEFAULT nextval('public."systemSettings_id_seq"'::regclass);


--
-- Name: userActions id; Type: DEFAULT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."userActions" ALTER COLUMN id SET DEFAULT nextval('public."userActions_id_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.
COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM '$$PATH$$/3156.dat';

--
-- Data for Name: credentialChangeRequests; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialChangeRequests" (uuid, status, "requestedBy", "confirmedBy", "changedFrom", "changedTo", "fieldName", "createdAt", "updatedAt") FROM stdin;
\.
COPY public."credentialChangeRequests" (uuid, status, "requestedBy", "confirmedBy", "changedFrom", "changedTo", "fieldName", "createdAt", "updatedAt") FROM '$$PATH$$/3164.dat';

--
-- Data for Name: credentialChanges; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialChanges" (id, "credentialUuid", "credentialDid", "changedByUuid", "changedFrom", "changedTo", "fieldName", "changedAt", hash, "smartContractId") FROM stdin;
\.
COPY public."credentialChanges" (id, "credentialUuid", "credentialDid", "changedByUuid", "changedFrom", "changedTo", "fieldName", "changedAt", hash, "smartContractId") FROM '$$PATH$$/3163.dat';

--
-- Data for Name: credentialShares; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialShares" (uuid, "recipientEmails", "credentialUuid", "sharedFields", "temporaryPassword", "expiresAt", "createdAt") FROM stdin;
\.
COPY public."credentialShares" (uuid, "recipientEmails", "credentialUuid", "sharedFields", "temporaryPassword", "expiresAt", "createdAt") FROM '$$PATH$$/3161.dat';

--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.credentials (uuid, did, status, "studentUuid", "institutionUuid", "uploadUuid", "certificateId", "graduatedName", "authenticatedBy", "qualificationName", majors, minors, "authenticatedTitle", "awardingInstitution", "qualificationLevel", "awardLevel", "studyLanguage", info, "gpaFinalGrade", "authenticatedAt", "studyStartedAt", "studyEndedAt", "graduatedAt", "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.
COPY public.credentials (uuid, did, status, "studentUuid", "institutionUuid", "uploadUuid", "certificateId", "graduatedName", "authenticatedBy", "qualificationName", majors, minors, "authenticatedTitle", "awardingInstitution", "qualificationLevel", "awardLevel", "studyLanguage", info, "gpaFinalGrade", "authenticatedAt", "studyStartedAt", "studyEndedAt", "graduatedAt", "expiresAt", "createdAt", "updatedAt") FROM '$$PATH$$/3158.dat';

--
-- Data for Name: credentialsWithdrawalRequests; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."credentialsWithdrawalRequests" (uuid, "credentialsUuid", "initiatedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt") FROM stdin;
\.
COPY public."credentialsWithdrawalRequests" (uuid, "credentialsUuid", "initiatedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt") FROM '$$PATH$$/3168.dat';

--
-- Data for Name: institutions; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") FROM stdin;
\.
COPY public.institutions (uuid, status, "emailDomain", "logoUrl", name, "createdAt", "updatedAt") FROM '$$PATH$$/3159.dat';

--
-- Data for Name: oneTimePasswords; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."oneTimePasswords" (uuid, code, "validUntil", "canBeResentAt") FROM stdin;
\.
COPY public."oneTimePasswords" (uuid, code, "validUntil", "canBeResentAt") FROM '$$PATH$$/3169.dat';

--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.payments (uuid, "externalId", "studentUuid", status, amount, currency, method, "createdAt", "credentialUuids") FROM stdin;
\.
COPY public.payments (uuid, "externalId", "studentUuid", status, amount, currency, method, "createdAt", "credentialUuids") FROM '$$PATH$$/3173.dat';

--
-- Data for Name: smartContracts; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."smartContracts" (id, status, "deployedAt") FROM stdin;
\.
COPY public."smartContracts" (id, status, "deployedAt") FROM '$$PATH$$/3170.dat';

--
-- Data for Name: systemSettings; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."systemSettings" (id, name, value, "createdAt", "updatedAt") FROM stdin;
\.
COPY public."systemSettings" (id, name, value, "createdAt", "updatedAt") FROM '$$PATH$$/3172.dat';

--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.transactions (uuid, status, "credentialUuid", fee, hash, hex, "smartContractId", "createdAt", "confirmedAt") FROM stdin;
\.
COPY public.transactions (uuid, status, "credentialUuid", fee, hash, hex, "smartContractId", "createdAt", "confirmedAt") FROM '$$PATH$$/3165.dat';

--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.uploads (uuid, filename, "originalFilename", mapping, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt") FROM stdin;
\.
COPY public.uploads (uuid, filename, "originalFilename", mapping, status, "uploadedBy", "confirmationsRequestedFrom", "confirmedBy", "createdAt", "updatedAt") FROM '$$PATH$$/3160.dat';

--
-- Data for Name: userActions; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public."userActions" (id, "userUuid", "initiatorName", type, "subjectUuid", "credentialsUuid", "createdAt") FROM stdin;
\.
COPY public."userActions" (id, "userUuid", "initiatorName", type, "subjectUuid", "credentialsUuid", "createdAt") FROM '$$PATH$$/3167.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: qualkey
--

COPY public.users (uuid, email, password, role, "createdAt", "updatedAt", "lastLoginAt", "firstName", "lastName", currency, "stripeCustomerId", "institutionUuid") FROM stdin;
\.
COPY public.users (uuid, email, password, role, "createdAt", "updatedAt", "lastLoginAt", "firstName", "lastName", currency, "stripeCustomerId", "institutionUuid") FROM '$$PATH$$/3157.dat';

--
-- Name: credentialChanges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qualkey
--

SELECT pg_catalog.setval('public."credentialChanges_id_seq"', 22, true);


--
-- Name: systemSettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qualkey
--

SELECT pg_catalog.setval('public."systemSettings_id_seq"', 5, true);


--
-- Name: userActions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qualkey
--

SELECT pg_catalog.setval('public."userActions_id_seq"', 1, false);


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
-- Name: credentialsWithdrawalRequests credentialsWithdrawalRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialsWithdrawalRequests"
    ADD CONSTRAINT "credentialsWithdrawalRequests_pkey" PRIMARY KEY (uuid);


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
-- Name: oneTimePasswords oneTimePasswords_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."oneTimePasswords"
    ADD CONSTRAINT "oneTimePasswords_pkey" PRIMARY KEY (uuid);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (uuid);


--
-- Name: systemSettings systemSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."systemSettings"
    ADD CONSTRAINT "systemSettings_pkey" PRIMARY KEY (id);


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
-- Name: userActions userActions_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."userActions"
    ADD CONSTRAINT "userActions_pkey" PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: credentialChanges_hash_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "credentialChanges_hash_key" ON public."credentialChanges" USING btree (hash);


--
-- Name: credentialsWithdrawalRequests_credentialsUuid_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "credentialsWithdrawalRequests_credentialsUuid_key" ON public."credentialsWithdrawalRequests" USING btree ("credentialsUuid");


--
-- Name: credentials_did_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX credentials_did_key ON public.credentials USING btree (did);


--
-- Name: institutions_emailDomain_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "institutions_emailDomain_key" ON public.institutions USING btree ("emailDomain");


--
-- Name: payments_externalId_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "payments_externalId_key" ON public.payments USING btree ("externalId");


--
-- Name: smartContracts_id_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "smartContracts_id_key" ON public."smartContracts" USING btree (id);


--
-- Name: systemSettings_name_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "systemSettings_name_key" ON public."systemSettings" USING btree (name);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_stripeCustomerId_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON public.users USING btree ("stripeCustomerId");


--
-- Name: credentialChanges credentialChanges_credentialUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public."credentialChanges"
    ADD CONSTRAINT "credentialChanges_credentialUuid_fkey" FOREIGN KEY ("credentialUuid") REFERENCES public.credentials(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


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
-- Name: credentials credentials_uploadUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "credentials_uploadUuid_fkey" FOREIGN KEY ("uploadUuid") REFERENCES public.uploads(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payments payments_studentUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_studentUuid_fkey" FOREIGN KEY ("studentUuid") REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: transactions transactions_smartContractId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_smartContractId_fkey" FOREIGN KEY ("smartContractId") REFERENCES public."smartContracts"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_institutionUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_institutionUuid_fkey" FOREIGN KEY ("institutionUuid") REFERENCES public.institutions(uuid) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                