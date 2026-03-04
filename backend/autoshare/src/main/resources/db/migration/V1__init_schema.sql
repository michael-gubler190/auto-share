-- V1: Initial schema — users, cars, bookings, payments, reviews

-- =============================================================
-- AutoShare — Database Schema
-- =============================================================

-- -------------------------------------------------------------
-- ENUM TYPES
-- -------------------------------------------------------------

CREATE TYPE power_type_enum AS ENUM ('gas', 'electric');

CREATE TYPE transmission_enum AS ENUM ('AT', 'MT', 'CVT', 'DCT');

CREATE TYPE user_role_enum AS ENUM ('owner', 'renter', 'admin');

CREATE TYPE booking_state_enum AS ENUM (
  'requested',
  'approved',
  'rejected',
  'active',
  'cancelled',
  'completed'
);

CREATE TYPE payment_state_enum AS ENUM (
  'pending',
  'completed',
  'refund',
  'cancelled'
);

-- -------------------------------------------------------------
-- TABLES
-- -------------------------------------------------------------

CREATE TABLE "user" (
  "user_id"             varchar         PRIMARY KEY NOT NULL,
  "role"                user_role_enum,
  "full_name"           varchar         NOT NULL,
  "username"            varchar         UNIQUE,
  "password_hash"       varchar         NOT NULL,
  "email"               varchar         UNIQUE NOT NULL,
  "phone"               varchar         UNIQUE,
  "profile_picture_path" text,
  "created_at"          timestamptz     DEFAULT now(),
  "updated_at"          timestamptz     DEFAULT now()
);

CREATE TABLE "car" (
  "car_id"                    varchar           PRIMARY KEY NOT NULL,
  "user_id"                   varchar           NOT NULL,
  "make"                      varchar           NOT NULL,
  "model"                     varchar           NOT NULL,
  "year"                      integer           NOT NULL,
  "description"               text,
  "number_of_seats"           integer,
  "power_type"                power_type_enum,
  "miles_per_gallon"          float,
  "distance_with_full_charge" float,
  "transmission"              transmission_enum,
  "price_per_day"             float             NOT NULL,
  "created_at"                timestamptz       DEFAULT now(),
  "updated_at"                timestamptz       DEFAULT now()
);

CREATE TABLE "car_image" (
  "car_image_id"  varchar     PRIMARY KEY NOT NULL,
  "car_id"        varchar     NOT NULL,
  "image_path"    text        NOT NULL,
  "width"         float       NOT NULL,
  "height"        float       NOT NULL,
  "aspect_ratio"  float       NOT NULL,
  "created_at"    timestamptz DEFAULT now()
);

CREATE TABLE "booking" (
  "booking_id"        varchar             PRIMARY KEY NOT NULL,
  "car_id"            varchar             NOT NULL,
  "renter_id"         varchar             NOT NULL,
  "state"             booking_state_enum  NOT NULL,
  "trip_start"        timestamptz         NOT NULL,
  "trip_end"          timestamptz         NOT NULL,
  "total_price"       float               NOT NULL,
  "pickup_location"   varchar             NOT NULL,
  "drop_off_location" varchar             NOT NULL,
  "created_at"        timestamptz         DEFAULT now(),
  "updated_at"        timestamptz         DEFAULT now()
);

CREATE TABLE "payment" (
  "payment_id"  varchar             PRIMARY KEY NOT NULL,
  "booking_id"  varchar             NOT NULL,
  "state"       payment_state_enum  NOT NULL,
  "amount"      float               NOT NULL,
  "created_at"  timestamptz         DEFAULT now(),
  "updated_at"  timestamptz         DEFAULT now()
);

CREATE TABLE "review" (
  "review_id"             varchar     PRIMARY KEY NOT NULL,
  "sender_id"             varchar     NOT NULL,
  "car_id"                varchar     NOT NULL,
  "overall_rating"        float       NOT NULL,
  "clean_rating"          float       NOT NULL,
  "maintenance_rating"    float       NOT NULL,
  "communication_rating"  float       NOT NULL,
  "convenience_rating"    float       NOT NULL,
  "accuracy_rating"       float       NOT NULL,
  "body"                  varchar     NOT NULL,
  "created_at"            timestamptz DEFAULT now(),
  "updated_at"            timestamptz DEFAULT now()
);

-- -------------------------------------------------------------
-- FOREIGN KEYS
-- -------------------------------------------------------------

ALTER TABLE "car"
  ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "car_image"
  ADD FOREIGN KEY ("car_id") REFERENCES "car" ("car_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "booking"
  ADD FOREIGN KEY ("car_id") REFERENCES "car" ("car_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "booking"
  ADD FOREIGN KEY ("renter_id") REFERENCES "user" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payment"
  ADD FOREIGN KEY ("booking_id") REFERENCES "booking" ("booking_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "review"
  ADD FOREIGN KEY ("sender_id") REFERENCES "user" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "review"
  ADD FOREIGN KEY ("car_id") REFERENCES "car" ("car_id") DEFERRABLE INITIALLY IMMEDIATE;

-- -------------------------------------------------------------
-- INDEXES
-- -------------------------------------------------------------

-- Cars by owner
CREATE INDEX idx_car_user_id ON car(user_id);

-- Bookings by car
CREATE INDEX idx_booking_car_id ON booking(car_id);

-- Bookings by renter
CREATE INDEX idx_booking_renter_id ON booking(renter_id);

-- Booking date range
CREATE INDEX idx_booking_trip_dates ON booking(trip_start, trip_end);

-- Payments by booking
CREATE INDEX idx_payment_booking_id ON payment(booking_id);

-- Reviews by car
CREATE INDEX idx_review_car_id ON review(car_id);

-- Car images by car
CREATE INDEX idx_car_image_car_id ON car_image(car_id);