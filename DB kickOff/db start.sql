PGDMP                         |            ordering-system-db    12.17    12.17 F    b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            e           1262    17715    ordering-system-db    DATABASE     �   CREATE DATABASE "ordering-system-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
 $   DROP DATABASE "ordering-system-db";
                postgres    false            �            1259    17865    ingredient_alert_flag    TABLE     �   CREATE TABLE public.ingredient_alert_flag (
    id integer NOT NULL,
    ingredient_id integer NOT NULL,
    is_sent boolean DEFAULT false NOT NULL
);
 )   DROP TABLE public.ingredient_alert_flag;
       public         heap    postgres    false            �            1259    17863    ingredient_alert_flag_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredient_alert_flag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.ingredient_alert_flag_id_seq;
       public          postgres    false    217            f           0    0    ingredient_alert_flag_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.ingredient_alert_flag_id_seq OWNED BY public.ingredient_alert_flag.id;
          public          postgres    false    216            �            1259    17716    ingredients    TABLE     q   CREATE TABLE public.ingredients (
    id integer NOT NULL,
    ingredient_name character varying(30) NOT NULL
);
    DROP TABLE public.ingredients;
       public         heap    postgres    false            �            1259    17719    ingredients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ingredients_id_seq;
       public          postgres    false    202            g           0    0    ingredients_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;
          public          postgres    false    203            �            1259    17825    order_products    TABLE     �   CREATE TABLE public.order_products (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity numeric
);
 "   DROP TABLE public.order_products;
       public         heap    postgres    false            �            1259    17823    order_products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.order_products_id_seq;
       public          postgres    false    213            h           0    0    order_products_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.order_products_id_seq OWNED BY public.order_products.id;
          public          postgres    false    212            �            1259    17721    orders    TABLE     8   CREATE TABLE public.orders (
    id integer NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    17724    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    204            i           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    205            �            1259    17726    products    TABLE     k   CREATE TABLE public.products (
    id integer NOT NULL,
    product_name character varying(30) NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    17729    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    206            j           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    207            �            1259    17731    products_ingredients    TABLE       CREATE TABLE public.products_ingredients (
    id integer NOT NULL,
    product_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    ingredient_amount numeric(10,2) DEFAULT 0.1 NOT NULL,
    CONSTRAINT chk_ingredient_amount CHECK ((ingredient_amount >= 0.1))
);
 (   DROP TABLE public.products_ingredients;
       public         heap    postgres    false            �            1259    17734    products_ingredients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.products_ingredients_id_seq;
       public          postgres    false    208            k           0    0    products_ingredients_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.products_ingredients_id_seq OWNED BY public.products_ingredients.id;
          public          postgres    false    209            �            1259    17736    stock    TABLE     �   CREATE TABLE public.stock (
    id integer NOT NULL,
    ingredient_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    last_fill_operation integer
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    17851    stock_fill_history    TABLE     �   CREATE TABLE public.stock_fill_history (
    id integer NOT NULL,
    ingredient_id integer,
    total_after_fill_amount integer NOT NULL,
    fill_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 &   DROP TABLE public.stock_fill_history;
       public         heap    postgres    false            �            1259    17849    stock_fill_history_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_fill_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.stock_fill_history_id_seq;
       public          postgres    false    215            l           0    0    stock_fill_history_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.stock_fill_history_id_seq OWNED BY public.stock_fill_history.id;
          public          postgres    false    214            �            1259    17739    stock_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.stock_id_seq;
       public          postgres    false    210            m           0    0    stock_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;
          public          postgres    false    211            �
           2604    17868    ingredient_alert_flag id    DEFAULT     �   ALTER TABLE ONLY public.ingredient_alert_flag ALTER COLUMN id SET DEFAULT nextval('public.ingredient_alert_flag_id_seq'::regclass);
 G   ALTER TABLE public.ingredient_alert_flag ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �
           2604    17741    ingredients id    DEFAULT     p   ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);
 =   ALTER TABLE public.ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    17828    order_products id    DEFAULT     v   ALTER TABLE ONLY public.order_products ALTER COLUMN id SET DEFAULT nextval('public.order_products_id_seq'::regclass);
 @   ALTER TABLE public.order_products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212    213            �
           2604    17742 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            �
           2604    17743    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206            �
           2604    17744    products_ingredients id    DEFAULT     �   ALTER TABLE ONLY public.products_ingredients ALTER COLUMN id SET DEFAULT nextval('public.products_ingredients_id_seq'::regclass);
 F   ALTER TABLE public.products_ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208            �
           2604    17745    stock id    DEFAULT     d   ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);
 7   ALTER TABLE public.stock ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210            �
           2604    17854    stock_fill_history id    DEFAULT     ~   ALTER TABLE ONLY public.stock_fill_history ALTER COLUMN id SET DEFAULT nextval('public.stock_fill_history_id_seq'::regclass);
 D   ALTER TABLE public.stock_fill_history ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            _          0    17865    ingredient_alert_flag 
   TABLE DATA           K   COPY public.ingredient_alert_flag (id, ingredient_id, is_sent) FROM stdin;
    public          postgres    false    217   �R       P          0    17716    ingredients 
   TABLE DATA           :   COPY public.ingredients (id, ingredient_name) FROM stdin;
    public          postgres    false    202   S       [          0    17825    order_products 
   TABLE DATA           L   COPY public.order_products (id, order_id, product_id, quantity) FROM stdin;
    public          postgres    false    213   LS       R          0    17721    orders 
   TABLE DATA           $   COPY public.orders (id) FROM stdin;
    public          postgres    false    204   iS       T          0    17726    products 
   TABLE DATA           4   COPY public.products (id, product_name) FROM stdin;
    public          postgres    false    206   �S       V          0    17731    products_ingredients 
   TABLE DATA           `   COPY public.products_ingredients (id, product_id, ingredient_id, ingredient_amount) FROM stdin;
    public          postgres    false    208   �S       X          0    17736    stock 
   TABLE DATA           O   COPY public.stock (id, ingredient_id, amount, last_fill_operation) FROM stdin;
    public          postgres    false    210   T       ]          0    17851    stock_fill_history 
   TABLE DATA           c   COPY public.stock_fill_history (id, ingredient_id, total_after_fill_amount, fill_date) FROM stdin;
    public          postgres    false    215   ST       n           0    0    ingredient_alert_flag_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ingredient_alert_flag_id_seq', 5, true);
          public          postgres    false    216            o           0    0    ingredients_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingredients_id_seq', 1, false);
          public          postgres    false    203            p           0    0    order_products_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.order_products_id_seq', 219, true);
          public          postgres    false    212            q           0    0    orders_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.orders_id_seq', 131, true);
          public          postgres    false    205            r           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 1, false);
          public          postgres    false    207            s           0    0    products_ingredients_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.products_ingredients_id_seq', 8, true);
          public          postgres    false    209            t           0    0    stock_fill_history_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.stock_fill_history_id_seq', 5, true);
          public          postgres    false    214            u           0    0    stock_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.stock_id_seq', 10, true);
          public          postgres    false    211            �
           2606    17871 0   ingredient_alert_flag ingredient_alert_flag_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.ingredient_alert_flag
    ADD CONSTRAINT ingredient_alert_flag_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.ingredient_alert_flag DROP CONSTRAINT ingredient_alert_flag_pkey;
       public            postgres    false    217            �
           2606    17885 *   ingredient_alert_flag ingredient_id_unique 
   CONSTRAINT     n   ALTER TABLE ONLY public.ingredient_alert_flag
    ADD CONSTRAINT ingredient_id_unique UNIQUE (ingredient_id);
 T   ALTER TABLE ONLY public.ingredient_alert_flag DROP CONSTRAINT ingredient_id_unique;
       public            postgres    false    217            �
           2606    17747    ingredients ingredients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public            postgres    false    202            �
           2606    17833 "   order_products order_products_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_pkey;
       public            postgres    false    213            �
           2606    17749    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    204            �
           2606    17751 .   products_ingredients products_ingredients_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.products_ingredients
    ADD CONSTRAINT products_ingredients_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.products_ingredients DROP CONSTRAINT products_ingredients_pkey;
       public            postgres    false    208            �
           2606    17753    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    206            �
           2606    17857 *   stock_fill_history stock_fill_history_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.stock_fill_history
    ADD CONSTRAINT stock_fill_history_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.stock_fill_history DROP CONSTRAINT stock_fill_history_pkey;
       public            postgres    false    215            �
           2606    17755    stock stock_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_pkey;
       public            postgres    false    210            �
           2606    17883    stock unique_ingredient_id 
   CONSTRAINT     ^   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT unique_ingredient_id UNIQUE (ingredient_id);
 D   ALTER TABLE ONLY public.stock DROP CONSTRAINT unique_ingredient_id;
       public            postgres    false    210            �
           2606    17877    stock fk_last_fill_operation    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT fk_last_fill_operation FOREIGN KEY (last_fill_operation) REFERENCES public.stock_fill_history(id);
 F   ALTER TABLE ONLY public.stock DROP CONSTRAINT fk_last_fill_operation;
       public          postgres    false    2757    215    210            �
           2606    17872 >   ingredient_alert_flag ingredient_alert_flag_ingredient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_alert_flag
    ADD CONSTRAINT ingredient_alert_flag_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id);
 h   ALTER TABLE ONLY public.ingredient_alert_flag DROP CONSTRAINT ingredient_alert_flag_ingredient_id_fkey;
       public          postgres    false    202    2743    217            �
           2606    17844 +   order_products order_products_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_order_id_fkey;
       public          postgres    false    2745    213    204            �
           2606    17839 -   order_products order_products_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_product_id_fkey;
       public          postgres    false    206    213    2747            �
           2606    17761 <   products_ingredients products_ingredients_ingredient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_ingredients
    ADD CONSTRAINT products_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.products_ingredients DROP CONSTRAINT products_ingredients_ingredient_id_fkey;
       public          postgres    false    208    202    2743            �
           2606    17766 9   products_ingredients products_ingredients_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_ingredients
    ADD CONSTRAINT products_ingredients_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.products_ingredients DROP CONSTRAINT products_ingredients_product_id_fkey;
       public          postgres    false    206    208    2747            �
           2606    17858 8   stock_fill_history stock_fill_history_ingredient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_fill_history
    ADD CONSTRAINT stock_fill_history_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id);
 b   ALTER TABLE ONLY public.stock_fill_history DROP CONSTRAINT stock_fill_history_ingredient_id_fkey;
       public          postgres    false    2743    215    202            �
           2606    17771    stock stock_ingredient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_ingredient_id_fkey;
       public          postgres    false    2743    202    210            _   %   x�3�4�L�2�4����@҈�Hs�=... _�1      P   7   x�3�tJMM�2�t�HM-N�2�������2��O/-*�2���M,������ 7$�      [      x������ � �      R      x������ � �      T   +   x�3�t*-JO-�2��MM,IJ��)�2���LJJ������� �	�      V   ?   x�5��  �w� �:���a%>GSpt�6U	:���E�Φ~ǐ�8�W�w����D��"L      X   3   x�Eǻ  �:�G����sh�u7!�?s�������Q��Av��H>��      ]   C   x��ʱ�0���"�e��g��s�#p��������I=^�w�;ԅ`�9���i��o���G#�     